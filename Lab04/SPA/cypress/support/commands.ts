import { loginUserCommand } from '../commands/login.commands';

Cypress.Commands.add('loginAsStandardUser1', function () {
  loginUserCommand('ExternalUser', 'EXTERNAL_USER_1', 'USER_PASSWORD');
});

Cypress.Commands.add('loginAsInternalMod1', function () {
  loginUserCommand('ExternalUser', 'INTERNAL_MOD_1', 'MOD_PASSWORD');
});