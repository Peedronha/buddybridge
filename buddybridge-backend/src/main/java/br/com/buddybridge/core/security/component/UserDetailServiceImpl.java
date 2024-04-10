package br.com.buddybridge.core.security.component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import br.com.buddybridge.core.usuario.entity.dto.LoginDto;
import br.pucbr.pancake.usuario.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailServiceImpl.class);

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDetailServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Autowired
    public UsuarioService usuarioService;

    public UserDetails loadUserByEmail(LoginDto loginDto) throws UsernameNotFoundException, DataAccessException {

        if (usuarioService.existsByEmailAndPassword(loginDto.getUsername(), loginDto.getPassword())) {

            CustomUser user = getCustomUser(loginDto.getUsername());

            logger.info("Username: " + loginDto.getUsername() + " encontrado." + loginDto.getPassword());

            return user;
        }
        logger.error("Username: " + loginDto.getUsername() + " não encontrado na base. Acesso negado. ");
        throw new UsernameNotFoundException(loginDto.getUsername());

    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException, DataAccessException {

        try {
            CustomUser user = getCustomUser(userName);

            logger.info("Username: " + userName + " encontrado." + user.getPassword());

            return user;
        } catch (Exception ex) {
            logger.error("Username: " + userName + " não encontrado na base. Acesso negado. ");
            throw new UsernameNotFoundException(userName);
        }

    }

    private CustomUser getCustomUser(String userName) {

        logger.info("getCustomUser: " + userName + ".");

        CustomUser customUser = jdbcTemplate.queryForObject(
                "select email, senha, guidusuario from usuario where email=?", new Object[]{userName},
                new UserRowMapper());

        if (customUser != null) {
            customUser = new CustomUser(customUser.getUsername(), customUser.getPassword(), customUser.isEnabled(), customUser.isAccountNonExpired(), customUser.isCredentialsNonExpired(), customUser.isAccountNonLocked(), getUserRoles(customUser), customUser.getGuidUsuario());
        }

        return customUser;

    }

    private class UserRowMapper implements RowMapper<CustomUser> {
        @Override
        public CustomUser mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new CustomUser(rs.getString("email"), rs.getString("senha"), true, true, true, true, Collections.emptyList(), rs.getInt("guidusuario"));

        }
    }

    private List<GrantedAuthority> getUserRoles(CustomUser user) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ADMIN"));
        return authorities;
    }

}
