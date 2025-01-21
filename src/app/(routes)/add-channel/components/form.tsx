"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createChannel } from "@/actions/channel/create";
import { channelSchema, ChannelValues } from "@/types/channel";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getInfoChannel } from "@/actions/yt/getInfoChannel";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FormAddChannel = () => {
  const [error, setError] = useState<string>();
  const [isChannelExist, setIsChannelExist] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<ChannelValues>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: "",
      url: "",
      image: "",
      ytId: "",
      description: "",
      verified: false,
    },
  });

  const urlValue = form.watch("url");

  useEffect(() => {
    if (urlValue) {
      setError(undefined);
      startTransition(async () => {
        const { code, error, id, about, title, image } =
          await getInfoChannel(urlValue);
        if (error) {
          setError(error);
          setIsChannelExist(code === "ALREADY_EXIST");
        }
        if (id) form.setValue("ytId", id);
        if (about) form.setValue("description", about);
        if (title) form.setValue("name", title);
        if (image) form.setValue("image", image);
      });
    }
  }, [form, urlValue]);

  const onSubmit = async (values: ChannelValues) => {
    setError(undefined);
    startTransition(async () => {
      const { error } = await createChannel(values);
      if (error) {
        setError(error);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel URL</FormLabel>
              <FormControl>
                <Input placeholder="Channel URL" {...field} inputMode="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Channel name" {...field} inputMode="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ytId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YT ID</FormLabel>
              <FormControl>
                <Input placeholder="YouTube ID" {...field} inputMode="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input placeholder="Image URL" {...field} inputMode="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="verified"
          render={({ field }) => (
            <FormItem className="flex w-fit flex-row items-center gap-4 rounded-md py-4">
              <FormLabel className="mt-2">Verified</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-0"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          disabled={isPending || isChannelExist}
          className="ml-auto w-fit"
        >
          Add Channel
        </Button>
      </form>
    </Form>
  );
};

export default FormAddChannel;
