// xml.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as xml2js from 'xml2js';

const bodyParserXML = bodyParser.text({
  type: 'application/xml',
});

@Injectable()
export class XMLMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    bodyParserXML(req, res, (err) => {
      if (err) {
        return next();
      }

      xml2js.parseString(req.body, (err, json) => {
        if (err) {
          return next();
        }

        req.body = json.CreateUserDTO;
        next();
      });
    });
  }
}
