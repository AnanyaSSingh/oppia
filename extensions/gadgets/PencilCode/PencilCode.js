// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Directive for the PencilCode gadget.
 *
 * IMPORTANT NOTE: The naming convention for customization args that are passed
 * into the directive is: the name of the parameter, followed by 'With',
 * followed by the name of the arg.
 */

oppia.directive('oppiaGadgetPencilCode', [
  'oppiaHtmlEscaper', 'learnerParamsService', function(oppiaHtmlEscaper, learnerParamsService) {
    return {
      restrict: 'E',
      templateUrl: 'gadget/PencilCode',
      controller: ['$scope', '$element', function ($scope, $element) {
        var hasLoadingCompleted = false;
        // A copy of the value set via parameters, so that the gadget can be
        // reset when needed.
        $scope.newValueCached = '';

        $scope.$watch(function() {
          return learnerParamsService.getValue('PencilCode0initialCode');
        }, function(newValue, oldValue) {
          $scope.newValueCached = newValue;
          if (hasLoadingCompleted) {
            $scope.resetGadget(newValue);
          } else {
            $scope.doInitialLoad(newValue);
          }
        });

        var pce = new PencilCodeEmbed($element[0].children[0]);
        pce.on('load', function() {
          pce.hideToggleButton();
          hasLoadingCompleted = true;
        });

        $scope.doInitialLoad = function(initialCode) {
          pce.beginLoad(initialCode);
        };

        $scope.resetGadget = function(newCode) {
          pce.setCode(newCode);
        };
      }],
    }
  }
]);