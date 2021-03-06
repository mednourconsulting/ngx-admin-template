/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Personal / Commercial License.
 * See LICENSE_PERSONAL / LICENSE_COMMERCIAL in the project root for license information on type of purchased license.
 */

package com.akveo.bundlejava.authentication;

import com.akveo.bundlejava.authentication.exception.PasswordsDontMatchException;
import com.akveo.bundlejava.authentication.exception.UserNotFoundHttpException;
import com.akveo.bundlejava.authentication.resetpassword.RequestPasswordService;
import com.akveo.bundlejava.authentication.resetpassword.RestorePasswordService;
import com.akveo.bundlejava.authentication.resetpassword.ResetPasswordService;
import com.akveo.bundlejava.authentication.resetpassword.RestorePasswordDTO;
import com.akveo.bundlejava.authentication.resetpassword.RequestPasswordDTO;
import com.akveo.bundlejava.authentication.resetpassword.ResetPasswordDTO;
import com.akveo.bundlejava.authentication.resetpassword.exception.CantSendEmailHttpException;
import com.akveo.bundlejava.authentication.resetpassword.exception.IncorrectEmailHttpException;
import com.akveo.bundlejava.authentication.resetpassword.exception.TokenNotFoundOrExpiredHttpException;
import com.akveo.bundlejava.authentication.utils.AuthResultDTO;
import com.akveo.bundlejava.user.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

import static org.springframework.http.ResponseEntity.ok;

/**
 * Controller which provides functionality for authentication
 */
@Controller
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;
    private final RequestPasswordService requestPasswordService;
    private final RestorePasswordService restorePasswordService;
    private final ResetPasswordService resetPasswordService;

    @Autowired
    public AuthController(AuthService authService,
                          RequestPasswordService requestPasswordService,
                          RestorePasswordService restorePasswordService,
                          ResetPasswordService resetPasswordService) {
        this.authService = authService;
        this.requestPasswordService = requestPasswordService;
        this.restorePasswordService = restorePasswordService;
        this.resetPasswordService = resetPasswordService;
    }

    /**
     * Login user
     * @param loginDTO user credentials
     * @return generated token
     */
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            Token token = authService.login(loginDTO);
            return toResponse(token);
        } catch (UserNotFoundHttpException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.FORBIDDEN);
        }

    }

    /**
     * Restore password
     * @param restorePasswordDTO new password with token
     * @return result message

    @PostMapping("/restore-pass")
    public ResponseEntity restorePassword(@Valid @RequestBody RestorePasswordDTO restorePasswordDTO) throws IOException {
        if (!restorePasswordDTO.getNewPassword().equals(restorePasswordDTO.getConfirmPassword())) {
            throw new PasswordsDontMatchException();
        }

        restorePasswordService.restorePassword(restorePasswordDTO);
        return ok("Password was restored");
    }*/
    /**
     * Restore password
     * @param restorePasswordDTO new password with token
     * @return result message
    */
    @PostMapping("/restore-pass")
    public ResponseEntity restorePassword(@Valid @RequestBody RestorePasswordDTO restorePasswordDTO) {
        try {
            restorePasswordService.restorePassword(restorePasswordDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (IOException iOException) {
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (TokenNotFoundOrExpiredHttpException e) {
            return new  ResponseEntity(HttpStatus.FORBIDDEN);
        } catch (PasswordsDontMatchException e) {
            return new  ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Sign up
     * @param signUpDTO sign up user data
     * @return token
     */
    @PostMapping("/sign-up")
    public ResponseEntity register(@Valid @RequestBody SignUpDTO signUpDTO) {
        if (!signUpDTO.getPassword().equals(signUpDTO.getConfirmPassword())) {
            throw new PasswordsDontMatchException();
        }

        Token token = authService.register(signUpDTO);
        return toResponse(token);
    }

    /**
     * Request password. Generate link for restoring password which should be sent via email
     * @param requestPasswordDTO object with user email
     * @return result message
     */
    @PostMapping("/request-pass")
    public ResponseEntity requestPassword(@Valid @RequestBody RequestPasswordDTO requestPasswordDTO) {
        try {
            requestPasswordService.requestPassword(requestPasswordDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch ( IncorrectEmailHttpException e) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }   catch ( CantSendEmailHttpException c) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }


    /**
     * Sign out. Perform any required actions to log out user, like invalidate user session.
     * Implement your required logic
     * @return result message
     */
    @PostMapping("/sign-out")
    public ResponseEntity logout() {
        return ok("Ok");
    }

    /**
     * Reset password for signed in user
     * @param resetPasswordDTO new and confirmed passwords
     * @return result message
     */
    @PostMapping("/reset-pass")
    public ResponseEntity resetPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        try {
            resetPasswordService.resetPassword(resetPasswordDTO);
            return new ResponseEntity(HttpStatus.OK);
        } catch (PasswordsDontMatchException e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * Refresh token
     * @param refreshTokenDTO refresh token
     * @return new token
     */
    @PostMapping("/refresh-token")
    public ResponseEntity refreshToken(@Valid @RequestBody RefreshTokenDTO refreshTokenDTO) {
        Token token = authService.refreshToken(refreshTokenDTO);
        return toResponse(token);
    }

    private ResponseEntity toResponse(Token token) {
        return ok(Collections.singletonMap("token", token));
    }
}
