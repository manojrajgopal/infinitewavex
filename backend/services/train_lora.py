import os
from diffusers import StableDiffusionPipeline
from diffusers import StableDiffusionTrainer, StableDiffusionTrainingArguments
from transformers import CLIPTokenizer
from datasets import load_dataset
import torch

# Paths
MODEL_NAME = "runwayml/stable-diffusion-v1-5"
DATASET_DIR = "dataset/"
OUTPUT_DIR = "models/lora_custom/"

# Device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load dataset
dataset = load_dataset("imagefolder", data_dir=DATASET_DIR)

# Load tokenizer
tokenizer = CLIPTokenizer.from_pretrained(MODEL_NAME)

# Training arguments
training_args = StableDiffusionTrainingArguments(
    output_dir=OUTPUT_DIR,
    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,
    learning_rate=1e-4,
    max_train_steps=1000,  # increase for more accuracy
    save_steps=100,
    logging_steps=10,
    mixed_precision="fp16",
    device=device
)

# Initialize trainer
trainer = StableDiffusionTrainer(
    model_name_or_path=MODEL_NAME,
    train_dataset=dataset,
    tokenizer=tokenizer,
    args=training_args,
)

# Start training
trainer.train()
trainer.save_model(OUTPUT_DIR)
