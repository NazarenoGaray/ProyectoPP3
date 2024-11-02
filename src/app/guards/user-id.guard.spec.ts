import { TestBed } from '@angular/core/testing';

import { UserIdGuard } from './user-id.guard';

describe('UserIdGuard', () => {
  let guard: UserIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
