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




  var where = [], whereQuery = { or: []}, select = [] , order = {}

  //it is for parse a boolean string
  let parseBool = (value) => {
    switch (value.toLowerCase()){
      case 'false':
        return false
      case 'true':
        return true
      default:
        return value
    }
  }

  _options.columns.forEach(function (column, index) {
    if (column.data) {
      var property = column.data.split('.',2).shift()
      if (parseBool(column.searchable)) {

        if (column.search.value) {
          whereQuery[property] = parseBool(column.search.regex) ? { contains : column.search.value } :  column.search.value
        }

        if (_options.search.value){
          var or = {}
          or[property] = parseBool(_options.search.regex) ? { contains : _options.search.value } :  _options.search.value
          whereQuery.or.push(or)
        }
      }
      if (!property) return null
      select.push(property)
    }
  })



  _options.order.forEach(function (_order, index) {
    if (parseBool(_options.columns[_order.column].orderable) && _options.columns[_order.column].data) {
      var property = _options.columns[_order.column].data.split('.',2).shift()
      order[property] = _order.dir.toUpperCase()==='DESC' ? 0 : 1
    }
  })

  var query = {
    where: whereQuery,
    select: select,
    skip: +_options.start,
    limit: +_options.length,
    sort: order
  }

  if(query.select.length < 1) delete  query.select
  if(query.where.or.length < 1) delete  query.where.or
  //if(query.where < 1) delete  query.where.or

  // find the databased on the query and total items in the database data[0] and data[1] repectively
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