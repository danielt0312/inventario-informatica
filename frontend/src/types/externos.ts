import type { TCatalogo } from "./generics";

export type Area = TCatalogo;
export type Empleado = TCatalogo;
export type EmpleadoWithArea<TArea extends Area = Area, TEmpleado extends Empleado = Empleado> = TEmpleado & {
    area_id: TArea;
}
export type AreaWithEmpleados<TEmpleado extends Empleado = Empleado, TArea extends Area = Area> = TArea & {
    empleados: TEmpleado[];
}
