import { TableContainer, Paper, TableHead, Button, TableRow, TableCell, TableBody, Table } from '@material-ui/core';
import React from 'react'
import Image from "next/image"
import { usedrawerStore } from "../../store/drawerStore";

interface props {
    productData: any[]
}


export const ProductTable: React.FC<props> = ({ productData }) => {
    const useopenDrawer = usedrawerStore((state) => state.toggleState);
    const openEditProductDrawer = (DrawerState: string, component: string, data: any) => {
        useopenDrawer(DrawerState, component, data);
    };
    return (<>
        <Paper elevation={8} sx={{ width: '100%', maxWidth: 1200, overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 700 }}>
                <Table stickyHeader>
                    <TableHead >
                        <TableRow >
                            <TableCell align="center" colSpan={6} sx={{ backgroundColor: "#438a2d", color: "white", fontSize: "33px", letterSpacing: "2px", fontWeight: "600", fontFamily: "monospace" }}>
                                Products
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableHead>
                        <TableRow>
                            <TableCell width={150} align="center">Image</TableCell>
                            <TableCell align="center">name</TableCell>
                            <TableCell align="center">Slug</TableCell>
                            <TableCell align="center">Sub Category</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="left">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productData.map((iteam) => (
                            <TableRow
                                key={iteam.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    {iteam.thumbnail ? <Image width={70} height={50} src={iteam.thumbnail} alt={`${iteam.name} image `} /> : null}

                                </TableCell>
                                <TableCell align="center">{iteam.name}</TableCell>
                                <TableCell align="center">{iteam.slug}</TableCell>
                                <TableCell align="center">{iteam.subCatagory.name}</TableCell>
                                <TableCell align="center">
                                    {iteam.status == "true" ? (
                                        <Button
                                            sx={{
                                                backgroundColor: "#438a2d",
                                                color: "white",
                                                boxShadow: "5px 5px 15px #555050, -8px -8px 15px #ffffff",
                                                ":hover": {
                                                    backgroundColor: "#438a2d",
                                                    color: "white",
                                                    cursor: "default",
                                                },
                                            }}
                                        >
                                            {iteam.status}
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={{
                                                backgroundColor: "#e23f3f",
                                                color: "white",
                                                boxShadow: "5px 5px 18px #726262, -5px -5px 18px #ffffff",
                                                ":hover": {
                                                    backgroundColor: "#e23f3f",
                                                    color: "white",
                                                    cursor: "default",
                                                },
                                            }}
                                        >
                                            {iteam.status}
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        sx={{
                                            color: "black",
                                            display: "flex",
                                            boxShadow: "5px 5px 15px #747474, -8px -8px 15px #ffffff"
                                        }}
                                        onClick={() => {
                                            // openEditCatagoryDrawer(iteam);
                                            openEditProductDrawer("OPEN_DRAWER", "UPDATE_PRODUCT_FORM", iteam)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </>);
}