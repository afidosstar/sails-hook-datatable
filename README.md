# sails-hook-datatable
A sails hook for working with Jquery datatables.

### Install
```bash
npm i sails-hook-datatable-2 --save
```

### Support
This hook supports jquery DataTables 1.10+. If your working with a legacy version, see https://datatables.net/manual/server-side#Legacy for congiuration.

### Usage
Send a `GET` or `POST` to `/datatable/:model` to use

**NOTE:** Always set `column.data` as showing in example below as `sails.js` Always respond with an array of object `[{"name":"foo"}, {"name":"bar"}]]` not literals like
`[["boy","foo"], ["girl","bar"]]`. You can also set `column.data = country.state.city` where `country` is the column name. This would be handle well by both this hook and datatable.

```javascript
//Example where *account* is the model name


//ajax
$('#example').DataTable( {
    serverSide: true,
    ajax: {
        url: '/datatable/account',
        type: 'POST'
    },
    "columns": [
            { "data": "name" },
            { "data": "country.state"}
        ]
} );

//response
{
    "draw": 1,
    "recordsTotal": 57,
    "recordsFiltered": 57,
    "data": [
        {name: 'Damian', country: {state: "New york"}},
        {name: 'Sam', country: {state: "Benin"}},
        {name: 'Robophil', country: {state: "London"}},
        {name: 'Ovie', country: {state: "Paris"}}
    ]
}
```

To view attributes in a model, send a `GET` to `/datatable/column-names/:model` to fetch the attributes for that model. See response below
```javascript
{ columns: [
    'id', 'firstname', 'lastname'
]}
```

### Issues or Missing implementation
Create an issue to mention a bug or feature request. Fixed something? Send a PR

### Liscence
MIT

