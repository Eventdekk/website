import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import Page from "../../site/Page.js";
import { Text } from "../../utils/Text.js";

export function CreateEventPage() {
  return (
    <Page>
      <div class="text-center p-5">
        <Text>Create Event Page</Text>
      </div>
    </Page>
  );
}
