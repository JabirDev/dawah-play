"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, useRouter } from "next/navigation";
import { ChannelResponse } from "@/types/youtube";
import { getInitialName } from "@/lib/utils";

const formSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  avatar: z
    .object({ url: z.string(), width: z.number(), height: z.number() })
    .array(),
  isVerified: z.boolean().default(false),
  url: z.string().min(1),
  banner: z
    .object({ url: z.string(), width: z.number(), height: z.number() })
    .array(),
  subscribers: z.string().min(1),
  joined: z.string().min(1),
  country: z.string().min(1),
});

type ChannelFormValues = z.infer<typeof formSchema>;

const ChannelForm = () => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const initialValue: ChannelFormValues = {
    id: "",
    name: "",
    avatar: [],
    isVerified: false,
    url: "",
    banner: [],
    subscribers: "",
    joined: "",
    country: "",
    description: "",
  };
  const title = "Add Channel";
  const description = "Add a new channel";
  const toastMessage = "Channel added";
  const action = "Add Channel";

  const form = useForm<ChannelFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValue,
  });

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const channelId = e.target.value;
    if (channelId) {
      try {
        setLoading(true);
        const ch = await fetch(`/api/yt?id=${channelId}`);
        const isChannelExist = await ch.json();
        if (params.channelId === "new" && isChannelExist) {
          alert(JSON.stringify(isChannelExist));
        } else {
          const response = await fetch(`/api/yt/${channelId}`);
          const resData = (await response.json()) as ChannelResponse;
          console.log("res: ", resData);
          console.log("initiaValue: ", initialValue);
          form.setValue("id", resData.id!);
          form.setValue("name", resData.name!);
          form.setValue("avatar", resData.avatar!);
          form.setValue("isVerified", resData.is_verified!);
          form.setValue("url", resData.url!);
          form.setValue("banner", resData.banner!);
          form.setValue("subscribers", resData.subscribers!);
          form.setValue("joined", resData.joined!);
          form.setValue("country", resData.country! ?? "Indonesia");
          form.setValue("description", resData.description!);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = async (data: ChannelFormValues) => {
    // console.log("woooy");
    // console.log("data: ", data);
    try {
      setLoading(true);
      const response = await fetch("/api/yt", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.refresh();
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="sticky top-0 z-20 flex items-center justify-between bg-background pb-4">
            <Heading
              showBackButton
              // backUrl="/admin/channel/"
              title={title}
              description={description}
            />
            <div className="flex gap-4">
              <Button disabled={loading} className="ml-auto" type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {action}
              </Button>
            </div>
          </div>
          <Separator />
          <div className="mt-8 grid grid-cols-3 items-center justify-center gap-8">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Id</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Channel Id"
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        field.onChange(e);
                        handleOnChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues().id && (
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage src={form.getValues()?.avatar.at(0)?.url} />
                  <AvatarFallback>
                    {getInitialName(form.getValues()?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <h2 className="font-bold">{form.getValues()?.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {form.getValues()?.subscribers}
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default ChannelForm;
