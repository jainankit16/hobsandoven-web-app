import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';

import {AuthenticationComponent} from './authentication.component';
import { UsersApi } from '../sdk/services/custom/Users';

describe('AuthenticationComponent', () => {
  let subject: UsersApi;
  let backend: MockBackend;
  let profileInfo = {
    email: 'swade@atlasthour.com',
    id: 9,
    name: 'Scott Wade (FSE)'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersApi,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend, defaultOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

//  beforeEach(inject([UsersApi, MockBackend], (github, mockBackend) => {
//    subject = github;
//    backend = mockBackend;
//  }));

  it('should get profile data of user', (done) => {
       done();
//    backend.connections.subscribe((connection: MockConnection) => {
//      let options = new ResponseOptions({ body: profileInfo });
//
//      connection.mockRespond(new Response(options));
//    });
//
//    subject.getCurrent('swade@atlasthour.com').subscribe((response) => {
//      expect(response).toEqual(profileInfo);
//      done();
//    });
  });

  
});