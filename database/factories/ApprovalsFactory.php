<?php

namespace Database\Factories;

use App\Models\Approvals;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Approval>
 */
class ApprovalsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     *
     */
    protected $model = Approvals::class;
    public function definition(): array
    {
        return [
            'DocType' => $this->faker->Name,
            'CategoryCode' => $this->faker->text,
            'CategoryName' => $this->faker->text,
            'BaseRef' => null,
        ];
    }
}
