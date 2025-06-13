import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Paper,
  Typography,
  Box
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material";
import { getProducts, removeProduct } from "../redux/productsSlice";
import Spinner from "./Spinner";

const ProductList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (status === "loading") return <Spinner />;
  if (!Array.isArray(list)) return <p>Error: list is not an array</p>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Product List
      </Typography>

      <Paper elevation={3} sx={{ overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Stock</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell align="center">
                  <Tooltip title="View Product">
                    <IconButton
                      component={RouterLink}
                      to={`/product/${p._id}`}
                      color="primary"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit Product">
                    <IconButton
                      component={RouterLink}
                      to={`/edit/${p._id}`}
                      color="secondary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Product">
                    <IconButton
                      onClick={() => dispatch(removeProduct(p._id))}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ProductList;
