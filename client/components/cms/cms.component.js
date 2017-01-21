import angular from 'angular';

export class CmsComponent {
  constructor() {
    'ngInject';

    //this.data = cmsService.getCmsData();
    //this.lang = _.find(this.data, {'tag': this.cms});
    this.lang = 'dinno';
  }
}

export default angular.module('directives.cms', [])
  .component('cms', {
    template: require('./cms.html'),
    controller: CmsComponent
  })
  .name;
