<?php
include 'includes/permiso.php';
?>
<!doctype html>

<html
  lang="en"
  class="light-style layout-navbar-fixed layout-menu-fixed layout-compact"
  dir="ltr"
  data-theme="theme-default"
  data-assets-path="assets/"
  data-template="vertical-menu-template-no-customizer">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <title>Dashboard - Clínicas Cabrera</title>

    <meta name="description" content="" />
<?php
include 'includes/header.php';
?>
   
  </head>

  <body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
     

<?php
include 'includes/menu.php';
?>

        <!-- Layout container -->
        <div class="layout-page">
          <!-- Navbar -->

 

          <!-- / Navbar -->

          <!-- Content wrapper -->
          <div class="content-wrapper">
            <!-- Content -->

            <div class="container-xxl flex-grow-1 container-p-y">
              <div class="row">
                <!-- A. Grafico linea comparativa tiempo actual con anterior -->
                 <div class="col-md-6 col-lg-6 mb-4 graficoA">
           <div class="card h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                      <div class="card-title mb-0">
                        <h5 class="m-0 me-2">Emails por clínicas</h5>
                        <small class="text-muted">Comparativa de emails en el tiempo</small>
                      </div>
                  <div class="grafico1" >
                      <div class="dropdown">
                       <button
                          type="button" id="aclinicas"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Todas las clínicas
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Madrid</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Barcelona</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Granada</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Coruña</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Todas las clínicas</a></li>                         
                        </ul>
                        </div>
                        <div class="dropdown">
                        <button
                          type="button" id="atiempo"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Último mes
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Última semana</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último mes</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último año</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Siempre</a></li> </ul>
                      </div>
					   <div class="dropdown">
                        <button
                          type="button" id="arrss"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          RRSS
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Si</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">No</a></li>
						  <li><a class="dropdown-item" href="javascript:void(0);">Todos</a></li></ul>
                      </div>
                   </div>   
                    </div>
                    <div class="card-body pb-0">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="d-flex flex-column align-items-center gap-1 totalemails">
                          <h2 class="mb-2"></h2>
                          <span></span>
                        </div>
                        <div id="emailsPizzaClinica"></div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div id="emailsLineaBarraComparativa"></div>
                    </div>              
                  </div>
                </div>
                <!-- Final A.-->
                 <!-- B. Grafico lineas por tipo tratamiento-->
                 <div class="col-md-6 col-lg-6 mb-4 graficoB">
           <div class="card h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                      <div class="card-title mb-0">
                        <h5 class="m-0 me-2">Emails por tipos de tratamientos</h5>
                        <small class="text-muted">Comparativa de todos los tipos de tratamientos</small>
                      </div>
                       <div class="grafico2" >  
                      <div class="dropdown">
                       <button
                          type="button" id="bclinicas"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Todas las clínicas
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Madrid</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Barcelona</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Granada</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Coruña</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Todas las clínicas</a></li>                         
                        </ul>
                           </div>
                           <div class="dropdown">
                        <button
                          type="button" id="btiempo"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Último mes
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Última semana</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último mes</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último año</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Siempre</a></li>                       
                        </ul>
                      </div>
					     <div class="dropdown">
                        <button
                          type="button" id="brrss"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          RRSS
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Si</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">No</a></li>
						  <li><a class="dropdown-item" href="javascript:void(0);">Todos</a></li></ul>
                      </div>
                      </div>      
                    </div>
                    <div class="card-body pb-0">
                      <div class="d-flex justify-content-between align-items-center mb-3 ">
                        <div class="d-flex flex-column align-items-center gap-1 totalemails">
                          <h2 class="mb-2"></h2>
                          <span></span>
                        </div>
                        <div id="emailsPizzaTipos"></div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div id="emailsLineasTipo"></div>
                    </div>              
                  </div>
                </div>
                <!-- Final B.-->


                <!-- C. Franja Horaria -->
                <div class="col-md-6 col-lg-4 mb-4 graficoC">
                  <div class="card h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                      <div class="card-title mb-0">
                        <h5 class="m-0 me-2">Franja horaria</h5>
                        <small class="text-muted">Horario elegido</small>
                      </div>
                         <div class="grafico3" >  
                       <div class="dropdown">
                       <button
                          type="button" id="cclinicas"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Todas
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Madrid</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Barcelona</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Granada</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Coruña</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Todas</a></li>                         
                        </ul>
                             </div>
                          <div class="dropdown">    
                        <button
                          type="button" id="ctiempo"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Último mes
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Última semana</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último mes</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último año</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Siempre</a></li>                       
                        </ul>
                             </div>
							   <div class="dropdown">
                        <button
                          type="button" id="crrss"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          RRSS
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Si</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">No</a></li>
						  <li><a class="dropdown-item" href="javascript:void(0);">Todos</a></li></ul>
                      </div> 
                      </div>
                    </div>
                                <div class="card-body">
                      <ul class="ps-0 m-0 porcentaje-horario">
                        <li class="d-flex mb-3 pb-2">
                          <div
                            class="chart-progress me-3 graficoc1"></div>
                          <div class="row w-100 align-items-center">
                            <div class="col-9">
                              <div class="me-2 tipoc1">
                                <h6 class="mb-2"></h6>
                                <small></small>
                              </div>
                            </div>
                           
                          </div>
                        </li>
                        <li class="d-flex mb-3 pb-2">
                          <div
                            class="chart-progress me-3 graficoc2"></div>
                          <div class="row w-100 align-items-center">
                            <div class="col-9">
                              <div class="me-2 tipoc2">
                                <h6 class="mb-2"></h6>
                                <small></small>
                              </div>
                            </div>
                            
                          </div>
                        </li>
                        <li class="d-flex mb-3 pb-2">
                          <div
                            class="chart-progress me-3 graficoc3"></div>
                          <div class="row w-100 align-items-center">
                            <div class="col-9">
                              <div class="me-2 tipoc3">
                                <h6 class="mb-2"></h6>
                                <small></small>
                              </div>
                            </div>
                           
                          </div>
                        </li>                      
                      </ul>
                    </div>
                  </div>
                </div>
                <!--/ Franja horaria-->

                                     <!-- D. Contacto por -->
                <div class="col-md-6 col-lg-4 mb-4 graficoD">
                  <div class="card h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                      <div class="card-title mb-0">
                        <h5 class="m-0 me-2">Contactar por</h5>
                        <small class="text-muted">Modo de contacto</small>
                      </div>
                         <div class="grafico4" >  
                       <div class="dropdown">
                       <button
                          type="button" id="dclinicas"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Todas
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Madrid</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Barcelona</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Granada</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Coruña</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Todas</a></li>                         
                        </ul>
                             </div>
                          <div class="dropdown">    
                        <button
                          type="button" id="dtiempo"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Último mes
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Última semana</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último mes</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último año</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Siempre</a></li>                       
                        </ul>
                             </div>
							    <div class="dropdown">
                        <button
                          type="button" id="drrss"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          RRSS
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Si</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">No</a></li>
						  <li><a class="dropdown-item" href="javascript:void(0);">Todos</a></li></ul>
                      </div>
                      </div>
                    </div>
                                <div class="card-body">
                      <ul class="ps-0 m-0 porcentaje-horario">
                        <li class="d-flex mb-3 pb-2">
                          <div
                            class="chart-progress me-3 graficod1"></div>
                          <div class="row w-100 align-items-center">
                            <div class="col-9">
                              <div class="me-2 tipod1">
                                <h6 class="mb-2"></h6>
                                <small></small>
                              </div>
                            </div>
                           
                          </div>
                        </li>
                        <li class="d-flex mb-3 pb-2">
                          <div
                            class="chart-progress me-3 graficod2"></div>
                          <div class="row w-100 align-items-center">
                            <div class="col-9">
                              <div class="me-2 tipod2">
                                <h6 class="mb-2"></h6>
                                <small></small>
                              </div>
                            </div>
                            
                          </div>
                        </li>
                        <li class="d-flex mb-3 pb-2">
                          <div
                            class="chart-progress me-3 graficod3"></div>
                          <div class="row w-100 align-items-center">
                            <div class="col-9">
                              <div class="me-2 tipod3">
                                <h6 class="mb-2"></h6>
                                <small></small>
                              </div>
                            </div>
                           
                          </div>
                        </li>                      
                      </ul>
                    </div>
                  </div>
                </div>
                  <!--/ Contactar por-->

      <!-- E. Emains por tratamiento en cada clínica -->
             <div class="col-md-6 col-lg-4 mb-4 graficoE">
                  <div class="card h-100">
                    <div class="card-header d-flex align-items-center justify-content-between">
                       <div class="card-title mb-0">
                        <h5 class="m-0 me-2">Por tratamiento</h5>
                        <small class="text-muted">Emails por clínica</small>
                      </div>
                        <div class="grafico5" >   
                       <div class="dropdown">
                       <button
                          type="button" id="etratamientos"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Todos
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Varices</a></li>
                   <li><a class="dropdown-item" href="javascript:void(0);">Úlcera Varicosa</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Hemorroides</a></li>  
                              <li><a class="dropdown-item" href="javascript:void(0);">Todos</a></li> 
                        </ul>
                            </div>
                             <div class="dropdown">
                        <button
                          type="button" id="etiempo"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          Siempre
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Última semana</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último mes</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Último año</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">Siempre</a></li>                       
                        </ul>
                            </div>       
   <div class="dropdown">
                        <button
                          type="button" id="errss"
                          class="btn btn-sm btn-label-primary dropdown-toggle"
                          data-bs-toggle="dropdown"
                          aria-expanded="false">
                          RRSS
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" href="javascript:void(0);">Si</a></li>
                          <li><a class="dropdown-item" href="javascript:void(0);">No</a></li>
						  <li><a class="dropdown-item" href="javascript:void(0);">Todos</a></li></ul>
                      </div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div id="deliveryExceptionsChart"></div>
                    </div>
                  </div>
                </div>
                <!--/ final E. -->

             


              </div>
   
       

              <!-- Registros Base de Datos-->
              <div class="card">
                <div class="card-datatable table-responsive">
                  <table class="datatables-basic table border-top">
                    <thead>
                      <tr>
					  <th>Id</th>
					  <th>Id</th>
					   <th>Id</th>
                       <th>Clínica</th>
                        <th>Tratamiento</th>
                        <th>Franja horaria</th>
                        <th>Contactar por</th>
                        <th>Fecha</th>
						<th>Contacto</th>
						      <th style="display:none;">Asunto</th>   
     <th style="display:none;">Tu mensaje</th>  
						<th>Acción</th>			

                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <!-- Modal to add new record -->
              <div class="offcanvas offcanvas-end" id="add-new-record">
                <div class="offcanvas-header border-bottom">
                  <h5 class="offcanvas-title" id="exampleModalLabel">Nuevo registro</h5>
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
                </div>
                  <div id="sino"></div>
                <div class="offcanvas-body flex-grow-1">
                  <form class="add-new-record pt-0 row g-2" id="form-add-new-record" method="POST">
                      <input type="hidden" name="idreg" id="idreginput" value="">
                        <div class="col-sm-12">
                      <label class="form-label" for="basicEmail">Email usuario</label>
                      <div class="input-group input-group-merge">
                      
                        <input
                          type="text"
                          id="email_usuario"
                          name="email_usuario"
                          class="form-control dt-email"
                               value=""
                />
                      </div>
                         <div class="col-sm-12">
                      <label class="form-label" for="basicEmail">Email destino</label>
                      <div class="input-group input-group-merge">
                       
                        <input
                          type="text"
                          id="email_destino"
                          name="email_destino"
                          class="form-control dt-email"
                                value=""
                     />
                      </div>
                      
                    <div class="col-sm-12">
                      <label class="form-label" for="basicFullname">Nombre</label>
                      <div class="input-group input-group-merge">
                    
                        <input
                          type="text"
                          id="nombre"
                          class="form-control dt-full-name"
                          name="nombre"                               
                               value=""               />
                      </div>
                    </div>
                      <div class="col-sm-12">
                      <label class="form-label" for="basicFullname">Apellido</label>
                      <div class="input-group input-group-merge">
                       
                        <input
                          type="text"
                          id="apellido"
                          class="form-control dt-full-name"
                          name="apellido"
                               value=""
                   />
                      </div>
                    </div>  
                               <div class="col-sm-12">
                      <label class="form-label" for="basicFullname">Teléfono</label>
                      <div class="input-group input-group-merge">
                      
                        <input
                          type="text"
                          id="telefono"
                          class="form-control dt-full-name"
                          name="telefono"
                               value=""
                  />
                      </div>
                    </div>     
                    <div class="col-sm-12">
                      <label class="form-label" for="basicPost">Tratamiento</label>
                      <div class="input-group input-group-merge">
        
                       <select name="tratamiento" id="tratamiento" class="form-select">
                           <option value="">Seleccionar</option>
                             <option value="Varices">Varices</option>
                          <option value="Úlcera Varicosa">Úlcera Varicosa</option>
                          <option value="Hemorroides">Hemorroides</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <label class="form-label" for="basicPost">Clínica</label>
                      <div class="input-group input-group-merge">
        
                       <select name="clinica" id="clinica" class="form-select">
                           <option value="">Seleccionar</option>
                             <option value="Madrid">Madrid</option><option value="Barcelona">Barcelona</option><option value="Granada">Granada</option><option value="Coruña">Coruña</option>
                        </select>
                      </div>
                    </div>
                      <div class="col-sm-12">
                      <label class="form-label" for="basicPost">Contactar por</label>
                      <div class="input-group input-group-merge">
        
                       <select name="contactar_por" id="contactar_por" class="form-select">
                           <option value="">Seleccionar</option>
                             <option value="Teléfono">Teléfono</option>
  <option value="Email">Email</option>
   <option value="Cualquiera">Cualquiera</option>
                        </select>
                      </div>
                    </div>
                      <div class="col-sm-12">
                      <label class="form-label" for="basicPost">Franja horaria</label>
                      <div class="input-group input-group-merge">
        
                       <select name="franja_horaria" id="franja_horaria" class="form-select">
                           <option value="">Seleccionar</option>
                            <option value="De 9h a 13h">De 9h a 13h</option>
  <option value="De 17h a 20h">De 17h a 20h</option> 
  <option value="Cualquiera">Cualquiera</option> 
                        </select>
                      </div>
                    </div> 
                       <div class="col-sm-12">
                      <label class="form-label" for="basicFullname">Asunto</label>
                      <div class="input-group input-group-merge">
                      
                        <input
                          type="text"
                          id="asunto"
                          class="form-control dt-full-name"
                          name="asunto"
                               value=""
                  />
                      </div>
                    </div> 
                                     <div class="col-sm-12">
                      <label class="form-label" for="basicFullname">Mensaje</label>
                      <div class="input-group input-group-merge">
                      
                        <textarea name="tumensaje" class="form-control" id="tumensaje" rows="3"></textarea>    
                      </div>
                    </div> 
                             
                        
                             
                    <div class="col-sm-12">
                      <label class="form-label" for="basicDate">Fecha</label>
                      <div class="input-group input-group-merge">
                        <span id="basicDate2" class="input-group-text"><i class="bx bx-calendar"></i></span>
                        <input
                          type="text"
                          class="form-control dt-date"
                          id="fecha"
                          name="fecha"
                          aria-describedby="basicDate2"
                          placeholder="DD/MM/YYYY"
                          aria-label="DD/MM/YYYY" 
                            value="10/12/2023"  
                               />
                      </div>
                    </div>
					<div class="col-sm-12">
                      <label class="form-label" for="basicPost">Contacto</label>
                      <div class="input-group input-group-merge">
        
                       <select name="contacto" id="contacto" class="form-select">
                           <option value="">Seleccionar</option>
						     <option value="Si">Si</option> 
                            <option value="No">No</option>
                        </select>
                      </div>
                    </div> 
                   <br>
                    <div class="col-sm-12">
                      <button type="submit" class="btn btn-primary data-submit me-sm-3 me-1">Subir</button>
                      <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
              <!--/ DataTable with Buttons -->
              </div>
          </div>
            
          <!-- Content wrapper -->                     

        </div>
        <!-- / Layout page -->
      </div>

      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>

      <!-- Drag Target Area To SlideIn Menu On Small Screens -->
      <div class="drag-target"></div>
    </div>
    <!-- / Layout wrapper -->

    <!-- Core JS -->
    <!-- build:js assets/vendor/js/core.js -->

    <script src="assets/vendor/libs/jquery/jquery.js"></script>
    <script src="assets/vendor/libs/popper/popper.js"></script>
    <script src="assets/vendor/js/bootstrap.js"></script>
    <script src="assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
    <script src="assets/vendor/libs/hammer/hammer.js"></script>
    <script src="assets/vendor/libs/i18n/i18n.js"></script>
    <script src="assets/vendor/libs/typeahead-js/typeahead.js"></script>
    <script src="assets/vendor/js/menu.js"></script>

    <!-- endbuild -->

    <!-- Vendors JS -->
    <script src="assets/vendor/libs/apex-charts/apexcharts.js"></script>

    <!-- Main JS -->
    <script src="assets/js/main.js"></script>

    <!-- Page JS -->
    <script src="includes/graficos.js"></script>
      
      <!-- Vendors JS -->
    <script src="assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js"></script>
    <!-- Flat Picker -->
    <script src="assets/vendor/libs/moment/moment.js"></script>
    <script src="assets/vendor/libs/flatpickr/flatpickr.js"></script>
  <!-- Form Validation -->
    <script src="assets/vendor/libs/@form-validation/popular.js"></script>
    <script src="assets/vendor/libs/@form-validation/bootstrap5.js"></script>
    <script src="assets/vendor/libs/@form-validation/auto-focus.js"></script>
<!-- Page JS -->
    <script src="includes/bbdd.js"></script>

   <script src="includes/custom.js"></script>
  </body>
</html>
