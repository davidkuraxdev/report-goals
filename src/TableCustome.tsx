import MaterialTable from '@material-table/core';
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface RowData {
	title: string;
	price: number;
	category: string;
	rate: number;
	count: number;
	image: string;
	tableData?: { id: number };
}

// products
export interface ResponseProfucts {
	id: number;
	title: string;
	price: number;
	description: string;
	category: Category;
	image: string;
	rating: Rating;
}

export enum Category {
	Electronics = 'electronics',
	Jewelery = 'jewelery',
	MenSClothing = "men's clothing",
	WomenSClothing = "women's clothing",
}

export interface Rating {
	rate: number;
	count: number;
}

const TableCustome: React.FC = () => {
	const [data, setData] = useState<RowData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('https://fakestoreapi.com/products');
			const products = await response.json();

			const transformedData = products.map(
				(product: ResponseProfucts) => ({
					title: product.title,
					price: product.price,
					category: product.category,
					rate: product.rating.rate,
					count: product.rating.count,
					image: product.image,
				}),
			);

			setData(transformedData);
		};

		fetchData();
	}, []);

	return (
		<Paper>
			<MaterialTable
				title="Productos"
				columns={[
					{ title: 'Titulo', field: 'title' },
					{ title: 'Precio', field: 'price', type: 'numeric' },
					{ title: 'CAtegoria', field: 'category' },
					{ title: 'CAlificacion', field: 'rate', type: 'numeric' },
					{ title: 'Resenias', field: 'count', type: 'numeric' },
					{
						title: 'Imagen',
						field: 'image',
						render: (rowData) => (
							<img
								src={rowData.image}
								alt={rowData.title}
								style={{ width: 50, height: 50 }}
							/>
						),
					},
				]}
				data={data}
				editable={{
					onRowAdd: (newData) =>
						new Promise<void>((resolve) => {
							setTimeout(() => {
								setData([...data, newData]);
								resolve();
							}, 600);
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise<void>((resolve) => {
							setTimeout(() => {
								const updatedData = [...data];
								const index = oldData?.tableData?.id;
								if (index !== undefined) {
									updatedData[index] = newData;
									setData(updatedData);
								}
								resolve();
							}, 600);
						}),
					onRowDelete: (oldData) =>
						new Promise<void>((resolve) => {
							setTimeout(() => {
								const updatedData = [...data];
								const index = oldData.tableData?.id;
								if (index !== undefined) {
									updatedData.splice(index, 1);
									setData(updatedData);
								}
								resolve();
							}, 600);
						}),
				}}
				options={{
					actionsColumnIndex: -1,
				}}
				localization={{
					header: {
						actions: 'Acciones',
					},
					body: {
						emptyDataSourceMessage: 'No hay registros para mostrar',
						addTooltip: 'Añadir',
						deleteTooltip: 'Eliminar',
						editTooltip: 'Editar',
						editRow: {
							deleteText:
								'¿Seguro que deseas eliminar este registro?',
							cancelTooltip: 'Cancelar',
							saveTooltip: 'Guardar',
						},
					},
					toolbar: {
						searchTooltip: 'Buscar',
						searchPlaceholder: 'Buscar',
					},
					pagination: {
						labelRows: 'filas',
						labelRowsPerPage: 'Fila x Pagina',
						labelDisplayedRows: '{from}-{to} de {count}',
						firstAriaLabel: 'Primera página',
						firstTooltip: 'Primera página',
						previousAriaLabel: 'Página anterior',
						previousTooltip: 'Página anterior',
						nextAriaLabel: 'Página siguiente',
						nextTooltip: 'Página siguiente',
						lastAriaLabel: 'Última página',
						lastTooltip: 'Última página',
					},
				}}
			/>
		</Paper>
	);
};

export default TableCustome;
