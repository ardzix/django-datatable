# django-datatable
A library that serve datatable in server side running on python-django

# Installation
just `pip install -e git+https://github.com/ardzix/django-datatable.git#egg=datatable` in your python environment

# Usage
### Simple datatable serve

```python
from datatable import Datatable
from app.models import YourModelObject

    def datatable(self, request):

        qs = YourModelObject.objects.filter(
            deleted_at__isnull = True
        )

        defer = ['id', 'created_by', 'id_num', 'phone', 'created_at']

        d = Datatable(request, qs, defer)

        return d.get_data()
```

### Lookup field datatable serve

```python
from datatable import Datatable
from app.models import YourModelObject

def datatable(self, request):

    qs = YourModelObject.objects.filter(
        deleted_at__isnull = True
    )

    defer = ['id', 'created_by', 'id_num', 'phone', 'created_at']

    d = Datatable(request, qs, defer)
    d.set_lookup_defer(['created_by__first_name'])

    return d.get_data()
```

### Filter by date range datatable serve

```python
from datatable import Datatable
from app.models import YourModelObject

def datatable(self, request):

    qs = YourModelObject.objects.filter(
        deleted_at__isnull = True
    )

    defer = ['id', 'created_by', 'id_num', 'phone', 'created_at']

    d = Datatable(request, qs, defer, date_filter_key='created_at', start_date="2019-01-01", end_date='2020-01-01')
    d.set_lookup_defer(['created_by__first_name'])

    return d.get_data()
```

### Filter by date range datatable with query string
```
    URL?start_date=2019-01-01&end_date=2020-12-12
```

```python
from datatable import Datatable
from app.models import YourModelObject

def datatable(self, request):

    qs = YourModelObject.objects.filter(
        deleted_at__isnull = True
    )

    defer = ['id', 'created_by', 'id_num', 'phone', 'created_at']

    d = Datatable(request, qs, defer, date_filter_key='start_date')
    d.set_lookup_defer(['created_by__first_name'])

    return d.get_data()

```


### Full templateview class exampe

```python
from datatable import Datatable
from app.models import YourModelObject

class CustomerView(TemplateView):
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
```
