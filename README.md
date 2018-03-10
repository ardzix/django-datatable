# django-datatable
A library that serve datatable in server side running on python-django

# Installation
jus `pip install -e git+https://github.com/ardzix/django-datatable.git#egg=datatabl` in your python environment

# Usage
### Simple datatable serve
`
    def datatable(self, request):
        from datatable import Datatable
        from app.models import YourModelObject
        
        qs = YourModelObject.objects.filter(
            deleted_at__isnull = True
        )

        defer = ['id', 'created_by', 'id_num', 'phone', 'created_at']

        d = Datatable(request, qs, defer)
        
        return d.get_data()
`

### Lookup field datatable serve
`
    def datatable(self, request):
        from datatable import Datatable
        from app.models import YourModelObject
        
        qs = YourModelObject.objects.filter(
            deleted_at__isnull = True
        )

        defer = ['id', 'created_by', 'id_num', 'phone', 'created_at']

        d = Datatable(request, qs, defer)
        d.set_lookup_defer(['created_by__first_name'])
        
        return d.get_data()
`

### Full templateview class exampe
`
class CustomerView(TemplateView):
    from datatable import Datatable
    from app.models import YourModelObject

    template_name = "customer/index.html"
    
    def get(self, request):
        
        if request.GET.get('draw', None) != None:
            return self.datatable(request)

        return self.render_to_response({})

    def datatable(self, request):
        qs = YourModelObject.objects.filter(
            deleted_at__isnull = True
        )

        defer = ['id', 'created_by', 'id_num', 'phone', 'created_at']

        d = Datatable(request, qs, defer)
        d.set_lookup_defer(['created_by__first_name'])
        
        return d.get_data()
`
