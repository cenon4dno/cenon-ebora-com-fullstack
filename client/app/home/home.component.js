import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';

export class HomeController {

  /*@ngInject*/
  constructor($http, $scope, socket, CmsSrv) {
    console.log('here 1');
    this.$http = $http;
    this.socket = socket;
	this.cms = CmsSrv.getCmsData;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    console.log('here 2');
    this.$http.get('/api/things')
      .then(response => {
        console.log('response data', response.data);
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

export default angular.module('cenonEboraComFullstackApp.home', [uiRouter])
  .config(routing)
  .component('home', {
    template: require('./home.html'),
    controller: HomeController
  })
  .name;
