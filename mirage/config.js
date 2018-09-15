export default function() {
  this.namespace = '/api';
  let rentals = [{
    type: 'rentals',
    id: 'grand-old-mansion',
    attributes: {
      title: 'Grand Old Mansion',
      owner: 'Veruca Salt',
      city: 'San Francisco',
      category: 'Estate',
      bedrooms: 15,
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg'
    }
  }, {
    type: 'rentals',
    id: 'urban-living',
    attributes: {
      title: 'Urban Living',
      owner: 'Mike Teavee',
      city: 'Seattle',
      category: 'Condo',
      bedrooms: 1,
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
    }
  }, {
    type: 'rentals',
    id: 'downtown-charm',
    attributes: {
      title: 'Downtown Charm',
      owner: 'Violet Beauregarde',
      city: 'Portland',
      category: 'Apartment',
      bedrooms: 3,
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
    }
  }]
  this.get('/rentals', function(schema, req) {
      let params = req.queryParams;
      let keys = Object.keys(params);
      let results = rentals;
      if(keys.length){
          keys.forEach((key)=>{
            if(key !== undefined){
                let value = params[key];
                if( value === "" ){
                    results = rentals;
                }else{
                    results = results.filter((data)=>{
                        return new RegExp(value, "i" ).test(data.attributes[key]);
                    });
                }
            }
          });   
      }
      return {
          data:results
      }
  });
  // Find and return the provided rental from our rental list above
  this.get('/rentals/:id', function (db, request) {
    return { data: rentals.find((rental) => request.params.id === rental.id) };
  });

}