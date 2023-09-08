import { Box, Stack, TextField, Button, MenuItem } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
import { categories } from "../utils/categories";
import { useAddProductMutation } from "../api/productsapi";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const AddProduct = () => {
  const [open, setOpen] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [addProduct, { isLoading }] = useAddProductMutation();

  const handlechange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, file]);
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("description", description);
    myForm.append("price", price);
    myForm.append("category", category);
    myForm.append("stock", stock);
    images.forEach((image) => {
      myForm.append("file", image);
    });
    try {
      const res = await addProduct(myForm).unwrap();
      toast.success(res.message);
      setCategory("");
      setDescription("");
      setName("");
      setStock("");
      setPrice("");
      setCategory("");
      setImages([]);
      setImagesPreview([]);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: { xs: "flex", md: "block" },
            flexDirection: { xs: "column", md: "none" },
            alignItems: { xs: "center", md: "none" },
          }}
        >
          <AdminSidebar open={open} setOpen={setOpen} />
          <Stack
            minHeight={"100vh"}
            flex={1}
            margin="0rem auto 10rem auto"
            border={"1px solid red"}
            spacing={4}
            sx={{
              padding: { xs: "1rem", md: "2rem" },
              paddingLeft: { xs: "1rem", md: `${open ? "300px" : "30px"}` },
            }}
          >
            <AdminMenu
              setOpen={setOpen}
              title={"Add Products"}
              subtitle={"Fill Details of Products"}
            />
            <Stack
              gap={2}
              width={"100%"}
              sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
              <Stack
                onSubmit={handleSubmit}
                component={"form"}
                flex={1}
                gap={2}
              >
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label={"Name"}
                />
                <TextField
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type={"number"}
                  label={"Price"}
                />
                <TextField
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label={"Description"}
                />
                <TextField
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  type={"number"}
                  label={"Stock"}
                />
                <TextField
                  select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.name} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlechange}
                />
                <Button type={"submit"} variant={"contained"}>
                  Add product
                </Button>
              </Stack>
              <Stack flex={1}>
                <Stack
                  direction={"row"}
                  flexWrap={"wrap"}
                  spacing={1}
                  minHeight={50}
                  pl={2}
                  overflow={"auto"}
                  justifyContent={"center"}
                  gap={1}
                >
                  {imagesPreview.map((image, index) => (
                    <img
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "contain",
                      }}
                      key={index}
                      src={image}
                      alt="avatar Preview"
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default AddProduct;
