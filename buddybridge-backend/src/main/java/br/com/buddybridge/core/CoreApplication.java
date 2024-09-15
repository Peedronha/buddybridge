package br.com.buddybridge.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.*;

import jakarta.transaction.*;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class CoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoreApplication.class, args);
	}

	@Bean
	public UserTransaction userTransaction() {
		return new UserTransaction() {
			@Override
			public void begin() throws NotSupportedException, SystemException {

			}

			@Override
			public void commit() throws RollbackException, HeuristicMixedException, HeuristicRollbackException, SecurityException, IllegalStateException, SystemException {

			}

			@Override
			public void rollback() throws IllegalStateException, SecurityException, SystemException {

			}

			@Override
			public void setRollbackOnly() throws IllegalStateException, SystemException {

			}

			@Override
			public int getStatus() throws SystemException {
				return 0;
			}

			@Override
			public void setTransactionTimeout(int i) throws SystemException {

			}

		};
	}

}
