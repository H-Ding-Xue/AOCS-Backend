import { registerAs } from '@nestjs/config';

export default registerAs('swagger', () => ({
  enable: true,
  title: 'AOCS Service Framework',
  description: 'AOCS Service Framework API',
  version: '0.1',
}));
