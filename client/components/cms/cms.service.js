'use strict';

import * as _ from 'lodash';
import angular from 'angular';

export function CmsService() {

  var Cms = {

    setCmsData(data) {
      Cms.data = data;
    },
    getCmsData(tag) {
      return _.find(Cms.data,{'tag': tag}).message;
    }
  };

  return Cms;
}

export default angular.module('cenonEboraComFullstackApp.cms', [])
.factory('CmsSrv', CmsService)
.name;
