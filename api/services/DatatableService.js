/**
 * Returns a promise of the data when found
 */
module.exports.getData = function (model, options) {
  //access the waterline instance of this model
  var MODEL = sails.models[model]

  //if model dosen't exist
  if (!MODEL) {
    return new Promise((resolve, reject) => {
      reject({ error: `Model: ${model} dosen't exist.` })
    })
  }

  //possible column options as default
  var _columns = [{ data: '', name: '', searchable: false, orderable: false, search: { value: '' } }]
    //default order
    //Column to which ordering should be applied.
    // This is an index reference to the columns array of information that is also submitted to the server.

  var order = [{ column: 0, dir: 'asc' }]

  //possible options data as default
  var _options = {
    draw: 0,
    columns: _columns,
    start: 0,
    length: 10,
    search: { value: '', regex: false },
    order: order
  }

  //merge both Object, options and _options into _options
  Object.assign(_options, options)


  //response format
  var _response = {
    draw: _options.draw,
    recordsTotal: 0,
    recordsFiltered: 0,
    iTotalRecords: 0,//legacy
    iTotalDisplayRecords: 0,//legacy
    data: []
  }



/*
   //build where criteria
   var where = [], whereQuery = { or: [] }, select = [] , order = []

   if (_options.columns.length) {
   if (_options.columns[0].data == 0) {//type array
   /!**
   * sails never responds with an array of literals or primitives like [["boy","foo"], ["girl","bar"]]
   * do set your column.data attribute from your datatable config
   *!/
   } else {//type Object
   _options.columns.forEach((column, index) => {
   if (column.searchable) {
   if (column.data.indexOf('.') > -1) {//accesing object attribute for value
   var col = column.data.substr(0, column.data.indexOf('.'))
   var filter = {}
   filter[col] = {
   'contains': _options.search.value
   }
   select.push(col)
   where.push(filter)
   } else {
   var filter = {}
   filter[column.data] = {
   'contains': _options.search.value
   }
   select.push(column.data)
   where.push(filter)
   }
   }
   })
   }
   whereQuery = { or : where }
   } else {
   whereQuery = {}
   }
*/

  var where = [], whereQuery = { or: []}, select = [] , order = []

  _options.columns.forEach(function (column, index) {
    if (column.searchable) {
      if (column.data) {
        var property = column.data.split('.').shift()

        if (!property) return null

        select.push(property)

        if ( column.search.value) {
          whereQuery[property] = column.search.regex ? { contains : column.search.value } :  column.search.value
        }

        if (_options.search.value){
          var or = {}
          or[property] = _options.search.regex ? { contains : _options.search.value } :  _options.search.value
          whereQuery.or.push(or)
        }
      }
    }
  })
  if(whereQuery.or.length < 1) delete whereQuery.or
  if(select.length < 1) select: "*"


  _options.order.forEach(function (_order, index) {
    if (_options.columns[_order.column].orderable) {
      order.push(_options.columns[_order.column].data+ " " +_order.dir.toUpperCase())
    }
  })

  var query = {
    where: whereQuery,
    select: select,
    skip: +_options.start,
    limit: +_options.length,
    sort: order
  }
  //find the databased on the query and total items in the database data[0] and data[1] repectively
  return Promise.all([MODEL.find(query), MODEL.count()]).then(data => {
    _response.recordsTotal = data[1]//no of data stored
    _response.recordsFiltered = data[0].length//no of data after applying filter
    _response.iTotalRecords = data[1]//no of data stored (legacy)
    _response.iTotalDisplayRecords = data[0].length//no of data after applying filter (legacy)
    _response.data = data[0]//data

    return _response
  }).catch(error => {
    return error
  })
}

module.exports.getColumns = function (model) {
  //access the waterline instance of this model
  var MODEL = sails.models[model]

  //if model dosen't exist
  if (!MODEL) {
    return new Promise((resolve, reject) => {
      reject({ error: `Model: ${model} dosen't exist.` })
    })
  }

  var ATTR = Object.keys(MODEL._attributes)

  return new Promise((resolve, reject) => {
    if (ATTR) resolve(ATTR)
    else reject({ error: `Error fetching attribute for this model` })
  })
}