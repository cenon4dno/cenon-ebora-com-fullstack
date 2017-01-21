'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import cms from '../components/cms/cms.component';
import main from './main/main.component';
import home from './home/home.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import cmsService from '../components/cms/cms.service';

import './app.less';

angular.module('cenonEboraComFullstackApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io',
    uiRouter, uiBootstrap, _Auth, account, admin, navbar, footer, home, main, constants, socket, util,
    cms, cmsService
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, $http, Auth, CmsSrv) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });

    $http.get('/api/cms')
      .then(response => {
        console.log('cms response data', response);
        CmsSrv.setCmsData(response.data);
      });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['cenonEboraComFullstackApp'], {
      strictDi: true
    });
  });
