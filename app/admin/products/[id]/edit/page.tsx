import EditProductForm from "@/app/components/products/EditProductForm"
import ProductForm from "@/app/components/products/ProductForm"
import GoBackButton from "@/app/components/ui/GoBackButton"
import Heading from "@/app/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
      where: {
        id
      }  
    })
    if(!product) {
        notFound()
    }
    return product
}

export default async function EditProductsPgae({params} : {params: {id: number} }) {
  
    const product = await getProductById(+params.id)

    return (
    <>
      <Heading>Editar Productos: {product.name}</Heading>

      <GoBackButton/>

      <EditProductForm>
        <ProductForm
          product={product}
        />
      </EditProductForm>
    </>
  )
}
