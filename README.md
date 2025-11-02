# 📍 MyLocationApp (React Native + Expo)

Aplicativo desenvolvido em **React Native / Expo** com o objetivo de **demonstrar persistência de dados e uso de permissões**.  
Este projeto faz parte do exercício da disciplina *Soluções Mobile (UNISATC)*.

---

## 🎯 Objetivo do App

O **MyLocationApp** permite:
- Capturar a **localização atual** do usuário (latitude e longitude)
- Salvar essas localizações em um **banco de dados local SQLite**
- Persistir a **preferência de tema** (Dark/Light) usando **AsyncStorage**
- Solicitar e gerenciar **permissões de localização**
- Exibir a **lista de localizações salvas**, mesmo após fechar o app

---

## 🧠 Conceitos aplicados

| Conceito | Lib utilizada | Descrição |
|-----------|----------------|------------|
| Persistência simples | `@react-native-async-storage/async-storage` | Armazena preferências locais (ex: tema escuro/claro) |
| Banco de dados local | `expo-sqlite` | Armazena localizações capturadas (latitude/longitude/timestamp) |
| Permissões e GPS | `expo-location` | Solicita permissão e obtém coordenadas atuais |
| Interface e hooks | React Native / Hooks | Uso de `useState`, `useEffect` e `FlatList` |

---

## 🛠️ Tecnologias e dependências

- [Expo SDK 48+](https://docs.expo.dev/)
- [React Native 0.71+](https://reactnative.dev/)
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/)
- [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)

---


### 1️⃣ Pré-requisitos
- Node.js e npm/yarn instalados
- Expo CLI:
  ```bash
  npm install -g expo-cli
