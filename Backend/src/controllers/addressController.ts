// src/controllers/addressController.ts
import { Request, Response } from "express";
import addressService from "../services/addressService";

class AddressController {
  async createAddress(req: Request, res: Response): Promise<Response> {
    try {
      const address = await addressService.createAddress(req.body);
      return res.status(201).json(address);
    } catch (error) {
      return res.status(500).json({ error: "Error creating address" });
    }
  }

  async getAllAddressesByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const addresses = await addressService.getAllAddressesByUserId(
        Number(req.params.user_id)
      );
      return res.status(200).json(addresses);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching addresses" });
    }
  }

  async deleteAddress(req: Request, res: Response): Promise<Response> {
    try {
      await addressService.deleteAddress(Number(req.params.id));
      return res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Error deleting address" });
    }
  }
}

export default new AddressController();
