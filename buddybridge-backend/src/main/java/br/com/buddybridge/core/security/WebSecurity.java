package br.com.buddybridge.core.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class WebSecurity{

    private static final String[] SWAGGER_WHITELIST ={
            "/swagger-ui/**",
            "/v3/api/docs/**",
            "/swagger-resources/**",
            "/swagger-resources",
            "/h2-console/**",

    };

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http

                .csrf().disable()
                .authorizeRequests()
                .requestMatchers(SWAGGER_WHITELIST).permitAll()
                .requestMatchers(HttpMethod.GET).permitAll()
                .anyRequest().authenticated().and().httpBasic();

        http.headers().frameOptions().disable();

    return http.build();
    }
}
//                .cors().and()
//                .csrf().disable().authorizeHttpRequests()
//                .requestMatchers("/users").hasRole("manager")
//                .anyRequest().authenticated()
//                .and()
//                .formLogin();
