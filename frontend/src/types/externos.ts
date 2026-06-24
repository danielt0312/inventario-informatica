import type { TCatalogo } from "./generics";

export type Adscripcion = TCatalogo;
export type Empleado = TCatalogo;
export type EmpleadoWithAdscripcion<TAdscripcion extends Adscripcion = Adscripcion, TEmpleado extends Empleado = Empleado> = TEmpleado & {
    adscripcion_id: TAdscripcion;
}
export type AdscripcionWithEmpleados<TEmpleado extends Empleado = Empleado, TAdscripcion extends Adscripcion = Adscripcion> = TAdscripcion & {
    empleados: TEmpleado[];
}
