/**
 * DataTables Basic
 */
'use strict';

let fv, offCanvasEl;
document.addEventListener('DOMContentLoaded', function (e) {
  (function () {
    const formAddNewRecord = document.getElementById('form-add-new-record');

  
  
      
    setTimeout(() => {
      const newRecord = document.querySelector('.create-new'),
        offCanvasElement = document.querySelector('#add-new-record');
 
      // To open offCanvas, to add new record
      if (newRecord) {         
        newRecord.addEventListener('click', function () {	
		 $('#form-add-new-record').find('input, textarea, select').val('');
				 $('#add-new-record').removeClass('hiding'); 
          offCanvasEl = new bootstrap.Offcanvas(offCanvasElement);
          // Empty fields on offCanvas open      
          // Open offCanvas with form
          offCanvasEl.show();
        });
      }
    }, 200);

    // Form validation for Add new record
    fv = FormValidation.formValidation(formAddNewRecord, {
      fields: {
          email_usuario: {
          validators: {
            notEmpty: {
              message: 'Este email es obligatorio'
            },
            emailAddress: {
              message: 'No es un email válido'
            }
          }
        },
         email_destino: {
          validators: {
            notEmpty: {
              message: 'Este email es obligatorio'
            },
            emailAddress: {
              message: 'No es un email válido'
            }
          }
        }, 
        nombre: {
          validators: {
            notEmpty: {
              message: 'Introducir Nombre'
            }
          }
        },
            apellido: {
          validators: {
            notEmpty: {
              message: 'Introducir Apellido'
            }
          }
        },
            telefono: {
          validators: {
            notEmpty: {
              message: 'Introducir Teléfono'
            }
          }
        },
              clinica: {
          validators: {
            notEmpty: {
              message: 'Introducir Clínica'
            }
          }
        },
           tratamiento: {
          validators: {
            notEmpty: {
              message: 'Introducir Tratamiento'
            }
          }
        }, 
        contactar_por: {
          validators: {
            notEmpty: {
              message: 'Introducir Contactar por'
            }
          }
        },
                 franja_horaria: {
          validators: {
            notEmpty: {
              message: 'Introducir Franja_horaria'
            }
          }
        },
                 asunto: {
          validators: {
            notEmpty: {
              message: 'Introducir Asunto'
            }
          }
        },
                      tumensaje: {
          validators: {
            notEmpty: {
              message: 'Introducir Mensaje'
            }
          }
        },
       
        fecha: {
          validators: {
            notEmpty: {
              message: 'Introducir una Fecha'
            },
            date: {
              format: 'DD/MM/YYYY',
              message: 'No es un formato correcto'
            }
          }
        },       
      },
      plugins: {
        trigger: new FormValidation.plugins.Trigger(),
        bootstrap5: new FormValidation.plugins.Bootstrap5({
          // Use this for enabling/changing valid/invalid class
          // eleInvalidClass: '',
          eleValidClass: '',
          rowSelector: '.col-sm-12'
        }),
        submitButton: new FormValidation.plugins.SubmitButton(),
        // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
        autoFocus: new FormValidation.plugins.AutoFocus()
      },
      init: instance => {
        instance.on('plugins.message.placed', function (e) {
          if (e.element.parentElement.classList.contains('input-group')) {
            e.element.parentElement.insertAdjacentElement('afterend', e.messageElement);
          }
        });
      }
    });

      

    // FlatPickr Initialization & Validation
    const flatpickrDate = document.querySelector('[name="fecha"]');

    if (flatpickrDate) {
      flatpickrDate.flatpickr({
        enableTime: false,
        // See https://flatpickr.js.org/formatting/
        dateFormat: 'm/d/Y',
        // After selecting a date, we need to revalidate the field
        onChange: function () {
          fv.revalidateField('fecha');
        }
      });
    }
  })();
});

// datatable (jquery)
$(function () {
  var dt_basic_table = $('.datatables-basic'),
    dt_complex_header_table = $('.dt-complex-header'),
    dt_row_grouping_table = $('.dt-row-grouping'),
    dt_multilingual_table = $('.dt-multilingual'),
    dt_basic;

  // DataTable with buttons
  // --------------------------------------------------------------------

  if (dt_basic_table.length) {
    dt_basic = dt_basic_table.DataTable({
      ajax: 'includes/bbdd.php',
      columns: [
	  { data: 'id' },
	  { data: 'id' },
        { data: 'id' },
        { data: 'clinica' },
        { data: 'tratamiento' },
        { data: 'franja' },
        { data: 'contactar' },
        { data: 'fecha' },
		 { data: 'contacto' },
		  	{ data: 'asunto', visible: false },
{ data: 'tumensaje', visible: false },
		{ data: 'accion' }	
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
        },
		  {
  targets: [9,10], // asunto y mensaje
  visible: false,
  searchable: false
},
        {
          targets: 2,
          searchable: false,
          visible: true
        },
        {
          // Actions
          targets: -1,
          title: 'Acción',
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block">' +
              '<a href="javascript:;" class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>' +
              '<ul class="dropdown-menu dropdown-menu-end m-0">' +
              '<li><a href="javascript:;" class="dropdown-item">Detalles</a></li>' +
              '<div class="dropdown-divider"></div>' +
              '<li><a href="javascript:;" class="dropdown-item text-danger delete-record" >Eliminar</a></li>' +
              '</ul>' +
              '</div>' +
              '<a href="javascript:;" class="btn btn-sm btn-icon item-edit"><i class="bx bxs-edit"></i></a>'
            );
          }
        }
      ],
      order: [[2, 'desc']],
      dom: '<"card-header flex-column flex-md-row"<"head-label text-center"><"dt-action-buttons text-end pt-3 pt-md-0"B>><"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6 d-flex justify-content-center justify-content-md-end"f>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 10,
      lengthMenu: [10, 25, 50, 75, 100],
      language: {
    lengthMenu: "Mostrar _MENU_ por página",
          search: "Buscar:",
          info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    infoEmpty: "Mostrando 0 a 0 de 0 registros",
    infoFiltered: "(filtrado de _MAX_ entradas totales)",
        paginate: {
        previous: "Anterior",
        next: "Siguiente"
    }  
},  
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-primary dropdown-toggle me-2',
          text: '<i class="bx bx-export me-sm-1"></i> <span class="d-none d-sm-inline-block">Exportar</span>',
          buttons: [
            {
              extend: 'print',
              text: '<i class="bx bx-printer me-1" ></i>Imprimir',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8,9, 10],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css('color', config.colors.headingColor)
                  .css('border-color', config.colors.borderColor)
                  .css('background-color', config.colors.bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="bx bx-file me-1" ></i>Csv',
              className: 'dropdown-item',
				charset: 'utf-8',
				  bom: true,
				fieldSeparator: ';',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8,9, 10] , 
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="bx bxs-file-export me-1"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8,9, 10],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="bx bxs-file-pdf me-1"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8,9, 10],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="bx bx-copy me-1" ></i>Copiar',
              className: 'dropdown-item',
              exportOptions: {
                columns: [1,2,3, 4, 5, 6, 7],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('user-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            }
          ]
        },
        {
          text: '<i class="bx bx-plus me-sm-1"></i> <span class="d-none d-sm-inline-block">Añadir nuevo registro</span>',
          className: 'create-new btn btn-primary'
        }
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['full_name'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
    $('div.head-label').html('<h5 class="card-title mb-0">Base de datos contactos</h5>');
    // To remove default btn-secondary in export buttons
    $('.dt-buttons > .btn-group > button').removeClass('btn-secondary');
  }
 // Add New record
  // ? Remove/Update this code as per your requirements
  var count = 101;
  // On form submit, if form is valid
  fv.on('core.form.valid', function () {	  
    var $new_email_usuario = $('#email_usuario').val(),
      $new_post = $('.add-new-record .dt-post').val(),
      $new_email = $('.add-new-record .dt-email').val(),
      $new_date = $('.add-new-record .dt-date').val(),
      $new_salary = $('.add-new-record .dt-salary').val();

    if ($new_email_usuario != '') {
     var formData = $('#form-add-new-record').serialize();
$('#idreginput').val('');
            // Realizar una solicitud AJAX para enviar los datos del formulario
            $.ajax({
                type: 'POST',
                url: 'includes/newregistro.php', // Cambia esto con la URL de tu script PHP
                data: formData,
                success: function(response) {
                    if(response=="ok"){
                         dt_basic.ajax.reload();						 
						    $('#add-new-record').removeClass('show');
			    $('#add-new-record').addClass('hiding');  
				 $('.offcanvas-backdrop.fade.show').remove();
                    }else{
                        $('.fv-plugins-message-container').html('Registro no creado. Se ha producido algún error.');
                    }
                },
                error: function(xhr, status, error) {
                    // Manejar el error aquí
                    console.error('Error en la solicitud AJAX:', error);
                    console.log(xhr.responseText);
                }
            });
 
   
    }
  });
  

    $('#fecha').flatpickr({
                dateFormat: "d/m/Y"
            });
  
  
   // Update Record
  $('.datatables-basic tbody').on('click', '.item-edit', function () {
 $('.container-xxl').append('<div class="offcanvas-backdrop fade show"></div>');
	  
	  
	  	 $('#form-add-new-record').find('input, textarea, select').val('');
  $('#add-new-record').removeClass('hiding');
      $('#add-new-record').addClass('show');   
	     var $tr = $(this).closest('tr');
    var idreg= $tr.find('.sorting_1').text(); 	
	$('#idreginput').val(idreg);
	
	 var formData = {
            idreg: idreg
        };
      
            $.ajax({
                type: 'POST',
                url: 'includes/idreg.php', 
                data: formData,
                success: function(response) {
                   var data = JSON.parse(response);

                if (data.error) {
                    $('.fv-plugins-message-container').html('Se ha producido algún error. Inténtelo más tarde');
                } else {
                    // Llenar los campos del formulario con los datos recibidos
                    $('#email_usuario').val(data.email_usuario);
                    $('#email_destino').val(data.email_destino);
                    $('#nombre').val(data.nombre);
                    $('#apellido').val(data.apellido);
                    $('#telefono').val(data.telefono);
                    $('#tratamiento').val(data.tratamiento);
                    $('#clinica').val(data.clinica);
                    $('#contactar_por').val(data.contactar_por);
                    $('#franja_horaria').val(data.franja_horaria);
                    $('#asunto').val(data.asunto);
                    $('#tumensaje').val(data.tumensaje);
                    $('#fecha').val(data.fecha);
	                    $('#contacto').val(data.contacto);
						
                }
                },
                error: function(xhr, status, error) {
                    // Manejar el error aquí
                    console.error('Error en la solicitud AJAX:', error);
                    console.log(xhr.responseText);
                }
            });
	
	
  });
  
  // Cerrar update
   $('#add-new-record .btn-close').on('click', function () {
               $('#add-new-record').removeClass('show');
			    $('#add-new-record').addClass('hiding'); 
				      $('.offcanvas-backdrop.fade.show').remove();
            });

	
			


 // Delete Record
  $('.datatables-basic tbody').on('click', '.delete-record', function () {
    var $tr = $(this).closest('tr');        
    var id= $tr.find('.sorting_1').text();
      var confirmacion = confirm("¿Estás seguro de que deseas eliminar este registro?");    
    // Si el usuario confirma la eliminación
    if (confirmacion) {
    var formData = {
            id: id
        };
      
            $.ajax({
                type: 'POST',
                url: 'includes/deleteregistro.php', 
                data: formData,
                success: function(response) {
                    if(response=="ok"){
                         dt_basic.ajax.reload();
                    }else{
                        $('.fv-plugins-message-container').html('Registro no eliminado. Se ha producido algún error.');
                    }
                },
                error: function(xhr, status, error) {
                    // Manejar el error aquí
                    console.error('Error en la solicitud AJAX:', error);
                    console.log(xhr.responseText);
                }
            });
    }
     
  });
  
  

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
