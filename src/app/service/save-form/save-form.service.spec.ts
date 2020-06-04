import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async } from '@angular/core/testing';
import * as data from './save-form.service.mockup';
import { SaveFormService } from './save-form.service';

describe('SaveFormService', () => {
  let service: SaveFormService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should saveForm', () => {
    service.saveForm(data.obj);
    expect(service.saveForm).toBeTruthy();
  });

  it('should saveURL for type 1', () => {
    service.saveURL(1);
    expect(service.saveURL).toBeTruthy();
  });

  it('should saveURL for type 2', () => {
    service.saveURL(2);
    expect(service.saveURL).toBeTruthy();
  });

  it('should saveURL for type 3', () => {
    service.saveURL(3);
    expect(service.saveURL).toBeTruthy();
  });

  it('should saveURL for type 4', () => {
    service.saveURL(4);
    expect(service.saveURL).toBeTruthy();
  });

  it('should saveURL for type 5', () => {
    service.saveURL(5);
    expect(service.saveURL).toBeTruthy();
  });

  it('should saveURL for type 6', () => {
    service.saveURL(6);
    expect(service.saveURL).toBeTruthy();
  });

  it('should saveURL for type 7', () => {
    service.saveURL(7);
    expect(service.saveURL).toBeTruthy();
  });

});
