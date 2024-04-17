package br.com.buddybridge.core.security.config;
import java.security.SecureRandom;

public class PasswordGenerator {

    private static final String CHAR_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String CHAR_LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_DIGITS = "0123456789";
    private static final String CHAR_SPECIAL = "!@#$%^&*()-_=+";

    private static final String ALL_CHARACTERS = CHAR_UPPERCASE + CHAR_LOWERCASE + CHAR_DIGITS + CHAR_SPECIAL;

    private static SecureRandom random = new SecureRandom();

    public static String generatePassword(int length) {
        StringBuilder password = new StringBuilder(length);

        password.append(CHAR_UPPERCASE.charAt(random.nextInt(CHAR_UPPERCASE.length())));
        password.append(CHAR_DIGITS.charAt(random.nextInt(CHAR_DIGITS.length())));
        password.append(CHAR_SPECIAL.charAt(random.nextInt(CHAR_SPECIAL.length())));

        // Adiciona caracteres restantes aleatoriamente
        for (int i = 3; i < length; i++) {
            password.append(ALL_CHARACTERS.charAt(random.nextInt(ALL_CHARACTERS.length())));
        }

        // Embaralha os caracteres para tornar a senha mais aleatória
        char[] passwordArray = password.toString().toCharArray();
        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(length);
            char temp = passwordArray[i];
            passwordArray[i] = passwordArray[randomIndex];
            passwordArray[randomIndex] = temp;
        }

        return new String(passwordArray);
    }
}