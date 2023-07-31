import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MailService } from './mail/mail.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mail: MailService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  async getTest() {
    return await this.mail.sendMail({
      username: "juan.dharmananda",
      subject: "Psyhope Mailer Test",
      html: `
      <h1>Psyhope Mailer Test</h1>
      <p>Hi, this is a test email from Psyhope Mailer</p>
      `
    });
  }
}
