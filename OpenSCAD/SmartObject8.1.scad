dim_caja = [40, 30, 50]; 
dim_caja_interior = [dim_caja[0]-2, dim_caja[1]-2, dim_caja[2]-2];
dim_sensor = [10, 20, 3];
h_salidas_etps = 50;
d_salidas_etps = 10;
h_LED = 20;
d_LED = 5;
dim_tapa = [dim_caja[0]-2, 2, dim_caja[2]-2];
h_taco = dim_tapa[1]+10;
d_taco = 4;

difference(){
    // principal
    cube(dim_caja, center = true);
    
    // interior
    translate([0, 2, 0])
        #cube(dim_caja_interior, center = true);
    
    // salida ethernet y power supply
    rotate([0, 90, 0])
        #cylinder(h = h_salidas_etps, d = d_salidas_etps, center = true, $fn = 100);
    
    // salida LED
    translate([0, 0, 30])
        #cylinder(h = h_LED, d = d_LED, center = true, $fn = 100);
    
    // salida sensor colision
    translate([0, -dim_caja[1]/2, 0])
        #cube(dim_sensor, center = true);
}

difference(){
    // tapa - soporte
    translate([0, dim_caja[1]/2+5, 0])
        #cube(dim_tapa, center = true);
    
    // agujeros tacos
    tam_extra = 5;
    translate([-dim_tapa[0]/2+tam_extra, dim_caja[1]/2+tam_extra, dim_tapa[2]/2-tam_extra])
        rotate([90, 0, 0])
            #cylinder(h = h_taco, d = d_taco, center = true, $fn = 100);
    translate([dim_tapa[0]/2-tam_extra, dim_caja[1]/2+tam_extra, dim_tapa[2]/2-tam_extra])
        rotate([90, 0, 0])
            #cylinder(h = h_taco, d = d_taco, center = true, $fn = 100);
    translate([dim_tapa[0]/2-tam_extra, dim_caja[1]/2+tam_extra, -dim_tapa[2]/2+tam_extra])
        rotate([90, 0, 0])
            #cylinder(h = h_taco, d = d_taco, center = true, $fn = 100);
    translate([-dim_tapa[0]/2+tam_extra, dim_caja[1]/2+tam_extra, -dim_tapa[2]/2+tam_extra])
        rotate([90, 0, 0])
            #cylinder(h = h_taco, d = d_taco, center = true, $fn = 100);
}