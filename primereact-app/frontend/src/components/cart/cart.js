import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Navbar from "../navbar/navbar";

function Cart() {
  const toast = useRef(null);
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4200/purchase/getOrder");
        const json = await response.json();
        console.log(json);
        setOrder(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [order]); // eslint-disable-line react-hooks/exhaustive-deps

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.image}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
        style={{
          width: "100px",
          boxShadow:
            "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)",
          marginRight: "2rem",
        }}
      />
    );
  };

  const cancleBodyTemplate = (rowData) => {
    const deleteOrder = () => {
      //const url = "http://localhost:4200/purchase/deleteOrder/" + rowData._id;
      const url = `http://localhost:4200/purchase/deleteOrder/${rowData._id}`;
      console.log(url + " take");
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => {
          //console.log("Order successfully");
          toast.current.show({
            severity: "success",
            summary: "Cancel Success",
            life: 3000,
          });
        })
        .catch((err) => {
          console.log("can't register ");
          /*  toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Message Content",
          life: 3000,
        }); */
        });
    };
    return (
      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-danger"
        onClick={deleteOrder}
      />
    );
  };

  return (
    <div>
      <Navbar></Navbar>
      <Toast ref={toast} />
      <div>
        <DataTable
          /*  ref={dt} */
          value={order}
          /* selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)} */
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          /* globalFilter={globalFilter}
          header={header} */
        >
          {/* <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column> */}
          <Column header="Image" body={imageBodyTemplate}></Column>
          <Column field="team" header="Team" sortable></Column>
          <Column field="size" header="Size"></Column>
          <Column field="amount" header="Amount" sortable></Column>

          <Column
            field="totalPrice"
            header="Price"
            sortable
            /* body={priceBodyTemplate}
            sortable */
          ></Column>
          {/*  <Column
            field="rating"
            header="Reviews"
            body={ratingBodyTemplate}
            sortable
          ></Column>
          <Column
            field="inventoryStatus"
            header="Status"
            body={statusBodyTemplate}
            sortable
          ></Column>
          <Column body={actionBodyTemplate}></Column> */}
          <Column header="Cancel" body={cancleBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Cart;
