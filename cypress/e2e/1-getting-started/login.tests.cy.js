import * as data from "../../e2e/helpers/default_data.json"
import * as main_page from "../../e2e/locators/main_page.json"
import * as result_page from "../../e2e/locators/result_page.json"
import * as recovery_page from "../../e2e/locators/recovery_password_page.json"

describe('Проверка авторизации', function () {
     beforeEach('Начало теста', function () {
         cy.visit('/');
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
         cy.get(main_page.login_button).should('be.disabled');
         cy.get(main_page.footer).should('be.visible');
           });
         afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible');
        });
   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Авторизация прошла успешно');

    })

      it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('Password');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

      it('Валидация на наличие @', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })

       it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_page.email).type(data.login);
        cy.get(recovery_page.send_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })
     it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('user@login.com');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).should('be.visible');
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })
     //it('Приведение к строчным буквам в логине', function () {
       // cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        //cy.get(main_page.password).type(data.password);
        //cy.get(main_page.login_button).click();
        //cy.get(result_page.title).should('be.visible');
        //cy.get(result_page.title).contains('Авторизация прошла успешно');

   // })
    
  })

// запуск через теринал: npx cypress run --spec cypress/e2e/login.cy.js --browser chrome2e/poke.cy.js --browser chrome
