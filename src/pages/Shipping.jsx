import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State, City } from "country-state-city";
import { saveShippingInfo } from "../api/cart";
import CheckOutStep from "../components/CheckOutStep";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    setCity(shippingInfo?.city ? shippingInfo?.city : "");
    setState(shippingInfo?.state ? shippingInfo?.state : "");
    setAddress(shippingInfo?.address ? shippingInfo?.address : "");
    setCountry(shippingInfo?.country ? shippingInfo?.country : "");
    setPinCode(shippingInfo?.pinCode ? shippingInfo?.pinCode : "");
    setPhoneNo(shippingInfo?.phoneNo ? shippingInfo?.phoneNo : "");
  }, [
    shippingInfo.city,
    shippingInfo.state,
    shippingInfo.address,
    shippingInfo.pinCode,
    shippingInfo.phoneNo,
    shippingInfo.country,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      toast.error("Phone No Should be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({
        country,
        state,
        address,
        city,
        pinCode,
        phoneNo,
      })
    );
    navigate("/confirm");
  };

  return (
    <Box
      maxWidth={"1300px"}
      padding={"0.5rem"}
      p={2}
      sx={{
        margin: { xs: "4rem auto 1rem auto", md: "5rem auto 2rem auto" },
      }}
    >
      <CheckOutStep activeStep={0} />
      <Stack
        gap={2}
        maxWidth={"400px"}
        margin={"1rem auto 0 auto"}
        border={"1px solid black"}
        width={"100%"}
        p={2}
        borderRadius={"15px"}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <TextField
          label={"Address"}
          type="text"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={"Phone Number"}
          type="number"
          required
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={"Pincode"}
          type="number"
          required
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <PinDropIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          label={"Country"}
          type="text"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position={"start"}>
                <PublicIcon />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="">country</MenuItem>
          {Country.getAllCountries().map((c, i) => (
            <MenuItem key={i} value={c.isoCode}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        {country && (
          <TextField
            select
            label={"State"}
            type="text"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position={"start"}>
                  <TransferWithinAStationIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="" label="state">
              state
            </MenuItem>
            {State.getStatesOfCountry(country).map((s, i) => (
              <MenuItem key={i} value={s.isoCode}>
                {s.name}
              </MenuItem>
            ))}
          </TextField>
        )}
        {country && state && (
          <TextField
            select
            label={"City"}
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position={"start"}>
                  <LocationCityIcon />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">city</MenuItem>
            {City.getCitiesOfState(country, state).map((c, i) => (
              <MenuItem key={i} value={c.name}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        )}

        <Button
          disabled={city ? false : true}
          type={"submit"}
          variant={"contained"}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default Shipping;
