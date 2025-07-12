import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import { geminiFlashModel, geminiProModel } from "@/ai";
import {
  generateReservationPrice,
  generateSampleFlightSearchResults,
  generateSampleFlightStatus,
  generateSampleSeatSelection,
} from "@/ai/actions";
import { auth } from "@/app/(auth)/auth";
import {
  createReservation,
  deleteChatById,
  getChatById,
  getReservationById,
  saveChat,
} from "@/db/queries";
import { generateUUID } from "@/lib/utils";

export async function POST(request: Request) {
  return new Response(
    'This endpoint is now deprecated. Please use /api/github-issues for monitoring GitHub issues.',
    { status: 410 }
  );
}

export async function DELETE(request: Request) {
  return new Response(
    'This endpoint is now deprecated. Please use /api/github-issues for monitoring GitHub issues.',
    { status: 410 }
  );
}
