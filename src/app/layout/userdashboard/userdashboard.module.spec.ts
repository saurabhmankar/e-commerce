import { UserdashboardModule } from './userdashboard.module';

describe('UserdashboardModule', () => {
  let userdashboardModule: UserdashboardModule;

  beforeEach(() => {
    userdashboardModule = new UserdashboardModule();
  });

  it('should create an instance', () => {
    expect(userdashboardModule).toBeTruthy();
  });
});
