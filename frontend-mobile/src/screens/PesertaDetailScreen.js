import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import api from "../api/api";

export default function PesertaDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [peserta, setPeserta] = useState(null);

  useEffect(() => {
    // Agar ketika kembali dari Edit, datanya ter-refresh
    const unsubscribe = navigation.addListener('focus', () => {
      getDetailPeserta();
    });
    return unsubscribe;
  }, [navigation]);

  const getDetailPeserta = async () => {
    try {
      const response = await api.get(`/peserta/${id}`);
      setPeserta(response.data);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail peserta");
      console.log(error.message);
    }
  };

  if (!peserta) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  // Format Jenis Kelamin
  let textJK = peserta.jk;
  if (peserta.jk == 1 || peserta.jk === 'L') textJK = "Laki-laki";
  if (peserta.jk == 2 || peserta.jk === 'P') textJK = "Perempuan";

  // Format Tanggal Lahir
  const tanggalLahir = peserta.tanggallahir ? peserta.tanggallahir.substring(0, 10) : "-";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* HEADER: Foto dan Nama */}
      <View style={styles.header}>
        {peserta.foto ? (
          <Image 
            source={{ uri: `http://192.168.0.101:3000/uploads/${peserta.foto}` }} 
            style={styles.profileImage} 
          />
        ) : (
          <View style={styles.noPhoto}>
            <Ionicons name="person" size={60} color="#94a3b8" />
          </View>
        )}
        <Text style={styles.namaLengkap}>{peserta.nama}</Text>
        <Text style={styles.badgeId}>ID Peserta: {peserta.id}</Text>
      </View>

      {/* CARD DETAIL DATA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Informasi Pribadi</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#475569" style={styles.icon} />
          <View>
            <Text style={styles.label}>Tempat, Tanggal Lahir</Text>
            <Text style={styles.value}>{peserta.tempatlahir || "-"}, {tanggalLahir}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="male-female-outline" size={20} color="#475569" style={styles.icon} />
          <View>
            <Text style={styles.label}>Jenis Kelamin</Text>
            <Text style={styles.value}>{textJK || "-"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="book-outline" size={20} color="#475569" style={styles.icon} />
          <View>
            <Text style={styles.label}>Agama</Text>
            <Text style={styles.value}>{peserta.agama || "-"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="bicycle-outline" size={20} color="#475569" style={styles.icon} />
          <View>
            <Text style={styles.label}>Hobi</Text>
            <Text style={styles.value}>{peserta.hobi || "-"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Kontak & Domisili</Text>

        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color="#475569" style={styles.icon} />
          <View>
            <Text style={styles.label}>Telepon</Text>
            <Text style={styles.value}>{peserta.telepone || "-"}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="map-outline" size={20} color="#475569" style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Alamat Lengkap</Text>
            <Text style={styles.value}>{peserta.alamat || "-"}</Text>
            <Text style={styles.subValue}>
              {(peserta.nama_kabko || "Kabupaten/Kota -")}, {(peserta.nama_provinsi || "Provinsi -")}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("PesertaForm", {
            id: peserta.id,
          })
        }
      >
        <Ionicons name="pencil" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Edit Data Peserta</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#64748b",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  noPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#cbd5e1",
  },
  namaLengkap: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 12,
    textAlign: "center",
  },
  badgeId: {
    fontSize: 14,
    color: "#64748b",
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  icon: {
    marginTop: 2,
    marginRight: 12,
  },
  label: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "500",
  },
  subValue: {
    fontSize: 14,
    color: "#475569",
    marginTop: 2,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    elevation: 3,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
