/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_PERSONAL / LICENSE_COMMERCIAL in the project root for license information on type of purchased license.
 */

package com.akveo.bundlejava.authentication.resetpassword;

import com.akveo.bundlejava.authentication.resetpassword.exception.CantSendEmailHttpException;
import com.akveo.bundlejava.authentication.resetpassword.exception.IncorrectEmailHttpException;
import com.akveo.bundlejava.email.EmailServiceImpl;
import com.akveo.bundlejava.email.Mail;
import com.akveo.bundlejava.user.User;
import com.akveo.bundlejava.user.UserService;
import com.akveo.bundlejava.user.exception.UserNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static java.nio.charset.StandardCharsets.UTF_8;

@Service
public class RequestPasswordService {

    private Logger logger = LoggerFactory.getLogger(RequestPasswordService.class);

    private UserService userService;
    private RestorePasswordTokenRepository restorePasswordTokenRepository;
    private EmailServiceImpl emailService ;
    private Configuration configuration;

    @Autowired
    public RequestPasswordService(UserService userService,
                                  RestorePasswordTokenRepository restorePasswordTokenRepository,
                                  EmailServiceImpl emailService,
                                  Configuration configuration) {
        this.userService = userService;
        this.restorePasswordTokenRepository = restorePasswordTokenRepository;
        this.emailService = emailService;
        this.configuration = configuration;
    }

    @Value("${client.url}")
    private String clientUrl;

    @Value("${client.resetPasswordToken.expiration}")
    private Duration resetPasswordTokenExpiration;

    public void requestPassword(RequestPasswordDTO requestPasswordDTO) {
        User user;

        try {
            user = userService.findByEmail(requestPasswordDTO.getEmail());
        } catch (UserNotFoundException exception) {
            throw new IncorrectEmailHttpException();
        }

        // generate reset password token
        RestorePassword token = new RestorePassword();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpiresIn(this.calculateExpirationDate(resetPasswordTokenExpiration));
        restorePasswordTokenRepository.save(token);

        // send reset password token via email
        try {
            String resetPasswordUrl = this.createResetUrl(token);
            // Reset Password Token should be sent via Email. You can use reset url in your template
            logger.info("Reset url was created: {}", resetPasswordUrl);
            Mail emailRequest = new Mail();
            emailRequest.setFrom(new InternetAddress("contact.plateform@gmail.com"));
            emailRequest.setTo(user.getEmail());
            emailRequest.setSubject("Demande de r??initialisation du mot de passe");
            Map<String, String> model = new HashMap<>();
            model.put("email", user.getEmail());
            model.put("name", user.getUserName());
            model.put("url", resetPasswordUrl);
            Template template = configuration.getTemplate("forgotPassword-template.html");
            this.emailService.sendEmail(emailRequest, model,template);
        } catch (IOException | MessagingException exception) {
            throw new CantSendEmailHttpException();
        }
    }

    private LocalDateTime calculateExpirationDate(Duration tokenExpirationDuration) {
        return LocalDateTime.now().plusMinutes(tokenExpirationDuration.toMinutes());
    }

    private String createResetUrl(RestorePassword restorePassword) throws JsonProcessingException {
        // create reset password token dto
        RestorePasswordTokenDto restorePasswordTokenDto = new RestorePasswordTokenDto();
        restorePasswordTokenDto.setExpiryDate(restorePassword.getExpiresIn());
        restorePasswordTokenDto.setToken(restorePassword.getToken());

        // map token dto to json
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonToken = objectMapper.writeValueAsString(restorePasswordTokenDto);

        // encode with base64
        String encodedToken = Base64.getEncoder().encodeToString(jsonToken.getBytes(UTF_8));

        return clientUrl + "/auth/reset-password?token=" + encodedToken;
    }
}
