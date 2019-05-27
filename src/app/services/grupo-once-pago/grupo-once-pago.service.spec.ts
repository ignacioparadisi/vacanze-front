import { TestBed } from '@angular/core/testing';

import { GrupoOncePagoService } from './grupo-once-pago.service';

describe('GrupoOncePagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoOncePagoService = TestBed.get(GrupoOncePagoService);
    expect(service).toBeTruthy();
  });
});
