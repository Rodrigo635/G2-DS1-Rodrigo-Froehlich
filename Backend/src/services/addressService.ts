// src/services/addressService.ts
import { Address, AddressModel } from "../models/addressModel";

class AddressService {
  private addressModel: AddressModel;

  constructor() {
    this.addressModel = new AddressModel();
  }

  async createAddress(addressData: Address): Promise<Address> {
    return this.addressModel.create(addressData);
  }

  async getAllAddressesByUserId(user_id: number): Promise<Address[]> {
    return this.addressModel.findAllByUserId(user_id);
  }

  async deleteAddress(id: number): Promise<void> {
    return this.addressModel.delete(id);
  }
}

export default new AddressService();
