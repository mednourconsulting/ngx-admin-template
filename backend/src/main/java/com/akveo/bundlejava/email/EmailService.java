package com.akveo.bundlejava.email;

import freemarker.template.Template;
import java.util.Map;

public interface EmailService {
    default void sendEmail(Mail request, Map<String, String> model, Template template){}
}
