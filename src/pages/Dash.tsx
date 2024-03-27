import React, { useState } from "react";
import axios from "axios";
import { Card, Group, Text } from "@mantine/core";
import { CustomResponse } from "../interfaces/CustomResponse";

import { Upload } from "../components/Upload";
import { CustomCard } from "../components/CustomCard";

import { URL } from "../constraints/url";

export const Dash: React.FC<{ data: CustomResponse }> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [reupload, setReupload] = useState<CustomResponse>();
  const onFileSelected = async (fileSelected: File) => {
    const formData = new FormData();
    formData.append('file', fileSelected);

    try {
      setLoading(true);
      const response = await axios.post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setReupload(response.data);
      setLoading(false);
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <>
      <h1>Dashboard - Main Metrics</h1>

      <Group
        align="center"
        justify="center"
      >
        <CustomCard title="MRR" value={reupload?.mrr || data.mrr} />
        <CustomCard title="ARR" value={reupload?.arr || data.arr} />
        <CustomCard title="Chrun" value={reupload?.churn || data.churn} />
        <CustomCard title="Active Clientes - 2022" value={reupload?.active_clients[2022] || data.active_clients[2022]} />
        <CustomCard title="Active Clientes - 2023" value={reupload?.active_clients[2023] || data.active_clients[2023]} />
        <CustomCard title="Canceled Clientes - 2022" value={reupload?.active_clients[2022] || data.active_clients[2022]} />
        <CustomCard title="Canceled Clientes - 2023" value={reupload?.canceled_clients[2023] || data.canceled_clients[2023]} />
      </Group>

      <br />
      <Group
        align="center"
        justify="center"
      > 
        <Card
          shadow="sm" padding="md" radius="sm"
          w={240}
          h={140}
        >
          <Text
            size="xl"
            fw="bold"
          >
            New Upload
          </Text>
        
          <Upload
            onFileSelected={onFileSelected}
            placeholder="Choose other file"
            fileLoading={loading}
          />
        </Card>
      </Group>
    </>
  );
}
