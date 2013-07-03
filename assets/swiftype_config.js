(function($) {
  $(function() {
    Swiftype.engineKey = swiftypeParams.engineKey;
    Swiftype.inputElements = $('input[name=s]');

    function readSwiftypeConfigFor(option) {
      if ((typeof window.swiftypeConfig === 'undefined') || (typeof window.swiftypeConfig[option] === 'undefined') || window.swiftypeConfig[option] === null) {
        return undefined;
      }

      return function() { return window.swiftypeConfig[option] };
    }

    var SwiftypeConfigManager = {
      getFilters: function() {
        return readSwiftypeConfigFor('filters');
      },
      getSearchFields: function() {
        return readSwiftypeConfigFor('searchFields');
      },
      getSortField: function() {
        return readSwiftypeConfigFor('sortField');
      },
      getSortDirection: function() {
        return readSwiftypeConfigFor('sortDirection');
      }
    };

    var swiftypeOptions = {
      onComplete: function(dataItem, prefix) {
        Swiftype.pingAutoSelection(Swiftype.engineKey, dataItem['id'], prefix, function() { window.location = dataItem['url']; });
      },
      documentTypes: ['posts'],
      engineKey: Swiftype.engineKey,
      filters: SwiftypeConfigManager.getFilters(),
      searchFields: SwiftypeConfigManager.getSearchFields(),
      sortField: SwiftypeConfigManager.getSortField(),
      sortDirection: SwiftypeConfigManager.getSortDirection()
    };

    $.each(Swiftype.inputElements, function(idx, el) {
      var $el = $(el);
      $el.swiftype(swiftypeOptions);
    });
  });
})(jQuery);

