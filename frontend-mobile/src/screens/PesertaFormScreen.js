import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import api from "../api/api";

export default function PesertaFormScreen({ route, navigation }) {
  const id = route.params?.id;

  const [form, setForm] = useState({
    nama: "",
    tempatlahir: "",
    tanggallahir: "",
    agama: "",
    alamat: "",
    telepone: "",
    jk: "",
    hobi: "",
    idkabko: "",
  });

  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  const [provinsiList, setProvinsiList] = useState([]);
  const [kabkoList, setKabkoList] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");

  useEffect(() => {
    loadProvinsi();
    if (id) {
      getPesertaById();
    }
  }, [id]);

  const loadProvinsi = async () => {
    try {
      const response = await api.get("/provinsi");
      setProvinsiList(response.data);
    } catch (error) {
      console.log("Error load provinsi:", error.message);
    }
  };

  const loadKabko = async (idProv) => {
    try {
      const response = await api.get(`/kabko/provinsi/${idProv}`);
      setKabkoList(response.data);
    } catch (error) {
      console.log("Error load kabko:", error.message);
    }
  };

  const handleProvinsiChange = (itemValue) => {
    setSelectedProvinsi(itemValue);
    setForm({ ...form, idkabko: "" });
    if (itemValue) {
      loadKabko(itemValue);
    } else {
      setKabkoList([]);
    }
  };

  const getPesertaById = async () => {
    try {
      const response = await api.get(`/peserta/${id}`);
      const data = response.data;

      setForm({
        nama: data.nama || "",
        tempatlahir: data.tempatlahir || "",
        tanggallahir: data.tanggallahir ? data.tanggallahir.substring(0, 10) : "",
        agama: data.agama || "",
        alamat: data.alamat || "",
        telepone: data.telepone || "",
        jk: data.jk == 1 ? "L" : data.jk == 2 ? "P" : (data.jk || ""),
        hobi: data.hobi || "",
        idkabko: data.idkabko || "",
      });

      if (data.foto) {
        setFotoPreview(data.foto);
      }

      if (data.id_provinsi) {
        setSelectedProvinsi(data.id_provinsi);
        loadKabko(data.id_provinsi);
      }
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail peserta");
      console.log(error.message);
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoFile(result.assets[0]);
      setFotoPreview(result.assets[0].uri);
    }
  };

  const simpanPeserta = async () => {
    if (!form.nama || !form.tempatlahir || !form.tanggallahir) {
      Alert.alert("Validasi", "Nama, tempat lahir, dan tanggal lahir wajib diisi");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      if (fotoFile) {
        let filename = fotoFile.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        formData.append("foto", { uri: fotoFile.uri, name: filename, type });
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      if (id) {
        await api.put(`/peserta/${id}`, formData, config);
        Alert.alert("Sukses", "Data berhasil diperbarui");
      } else {
        await api.post("/peserta", formData, config);
        Alert.alert("Sukses", "Data berhasil ditambahkan");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data peserta");
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={form.nama}
        onChangeText={(value) => handleChange("nama", value)}
      />

      <Text style={styles.label}>Tempat Lahir</Text>
      <TextInput
        style={styles.input}
        placeholder="Tempat Lahir"
        value={form.tempatlahir}
        onChangeText={(value) => handleChange("tempatlahir", value)}
      />

      <Text style={styles.label}>Tanggal Lahir</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={form.tanggallahir}
        onChangeText={(value) => handleChange("tanggallahir", value)}
      />

      <Text style={styles.label}>Agama</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.agama}
          onValueChange={(itemValue) => handleChange("agama", itemValue)}
        >
          <Picker.Item label="-- Pilih --" value="" />
          <Picker.Item label="Islam" value="Islam" />
          <Picker.Item label="Kristen" value="Kristen" />
          <Picker.Item label="Hindu" value="Hindu" />
          <Picker.Item label="Buddha" value="Buddha" />
        </Picker>
      </View>

      <Text style={styles.label}>Alamat</Text>
      <TextInput
        style={styles.input}
        placeholder="Alamat"
        value={form.alamat}
        onChangeText={(value) => handleChange("alamat", value)}
        multiline
      />

      <Text style={styles.label}>Telepon</Text>
      <TextInput
        style={styles.input}
        placeholder="Telepon"
        value={form.telepone}
        onChangeText={(value) => handleChange("telepone", value)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Jenis Kelamin</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.jk}
          onValueChange={(itemValue) => handleChange("jk", itemValue)}
        >
          <Picker.Item label="-- Pilih --" value="" />
          <Picker.Item label="Laki-laki" value="L" />
          <Picker.Item label="Perempuan" value="P" />
        </Picker>
      </View>

      <Text style={styles.label}>Hobi</Text>
      <TextInput
        style={styles.input}
        placeholder="Hobi"
        value={form.hobi}
        onChangeText={(value) => handleChange("hobi", value)}
      />

      <Text style={styles.label}>Provinsi</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedProvinsi}
          onValueChange={handleProvinsiChange}
        >
          <Picker.Item label="-- Pilih Provinsi --" value="" />
          {provinsiList.map((item) => (
            <Picker.Item key={item.id} label={item.nama} value={item.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Kabupaten / Kota</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={form.idkabko}
          onValueChange={(itemValue) => handleChange("idkabko", itemValue)}
        >
          <Picker.Item label="-- Pilih Kabko --" value="" />
          {kabkoList.map((item) => (
            <Picker.Item key={item.id} label={item.nama} value={item.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Foto</Text>
      <TouchableOpacity style={styles.imageButton} onPress={handleFileChange}>
        <Text style={styles.imageButtonText}>Pilih Foto</Text>
      </TouchableOpacity>

      {fotoPreview && (
        <Image
          source={{
            uri: fotoPreview.includes("/")
              ? fotoPreview
              : `http://192.168.0.101:3000/uploads/${fotoPreview}`,
          }}
          style={styles.previewImage}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={simpanPeserta}>
        <Text style={styles.saveButtonText}>
          {id ? "Update Peserta" : "Simpan Peserta"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  imageButton: {
    backgroundColor: "#e2e8f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageButtonText: {
    textAlign: "center",
    color: "#334155",
    fontWeight: "bold",
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
