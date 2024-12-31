"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const NotificationSettings = () => {
  const [messageNotifications, setMessageNotifications] = useState("all");
  const [emailNotifications, setEmailNotifications] = useState({
    communication: false,
    marketing: false,
    social: false,
    security: false,
  });
  const [differentSettings, setDifferentSettings] = useState(false);

  return (
    <div className="p-6 mt-16 max-w-xlrounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-2">Notifications</h1>
      <p className="text-sm text-gray-400 mb-6">
        Configure how you receive notifications.
      </p>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Notify me about...</h2>
        <RadioGroup
          value={messageNotifications}
          onValueChange={setMessageNotifications}
          className="space-y-2"
        >
          <div className="flex items-center">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="ml-2">
              All new messages
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="direct" id="direct" />
            <Label htmlFor="direct" className="ml-2">
              Direct messages and mentions
            </Label>
          </div>
          <div className="flex items-center">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none" className="ml-2">
              Nothing
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Email Notifications</h2>
        <div className="space-y-4">
          {Object.entries(emailNotifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <Label htmlFor={key} className="font-semibold capitalize">
                  {key} emails
                </Label>
                <p className="text-sm">{getEmailDescription(key)}</p>
              </div>
              <Switch
                id={key}
                checked={value}
                onCheckedChange={(checked) =>
                  setEmailNotifications({
                    ...emailNotifications,
                    [key]: checked,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 flex items-start space-x-3">
        <Checkbox
          id="differentSettings"
          checked={differentSettings}
          onCheckedChange={setDifferentSettings}
        />
        <div>
          <Label htmlFor="differentSettings">
            Use different settings for my mobile devices
          </Label>
          <p className="text-sm">
            You can manage your mobile notifications in the mobile settings
            page.
          </p>
        </div>
      </div>

      <Button className="mt-4">Update notifications</Button>
    </div>
  );
};

// Helper function for descriptions
const getEmailDescription = (key: string) => {
  switch (key) {
    case "communication":
      return "Receive emails about your account activity.";
    case "marketing":
      return "Receive emails about new products, features, and more.";
    case "social":
      return "Receive emails for friend requests, follows, and more.";
    case "security":
      return "Receive emails about your account activity and security.";
    default:
      return "";
  }
};

export default NotificationSettings;
