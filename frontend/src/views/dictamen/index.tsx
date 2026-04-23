import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Link } from "@tanstack/react-router";

import { Route as RouteCreate } from '@/routes/_auth/dictamen/create'
import { PlusCircle } from "lucide-react";
import { Table } from "./partials/table";

function Dictamen() {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                    Dictámenes Tecnológicos
                </CardTitle>
                <Link to={RouteCreate.to}>
                    <Button
                        variant={'outline'}
                        size={'sm'}
                    >
                        <PlusCircle /> Crear
                    </Button>
                </Link>
            </CardHeader>

            <CardContent>
                <Table />
            </CardContent>
        </Card>
    )
}

export default Dictamen
